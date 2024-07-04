import { z } from "zod";

import { allPromisesSettled } from "@business-of-fashion/libs/src/allPromisesSettled";

import { OrganisationAccountUserService } from "domain/account/OrganisationAccountUserService";
import { OrganisationAuthorizerService } from "domain/b2b/OrganisationAuthorizerService";
import { GetUserService } from "domain/user/GetUserService";
import { makeOnce } from "libs/makeOnce";
import { removeAllSpaces } from "libs/removeAllSpaces";
import { logAttempt } from "services/monitoring/decorators/logAttempt";

const payloadSchema = z.union([
  z.object({
    accountId: z.string().min(1),
    userIds: z
      .string()
      .array()
      .min(1)
      .max(30)
      .transform((userIds) => userIds.map((userId) => removeAllSpaces(userId))),
    emails: z.never().optional(),
    requesterUserId: z.string().min(1),
    isManagementRequest: z.boolean(),
  }),
  z.object({
    accountId: z.string().min(1),
    emails: z
      .string()
      .array()
      .min(1)
      .max(30)
      .transform((emails) => emails.map((email) => removeAllSpaces(email))),
    userIds: z.never().optional(),
    requesterUserId: z.string().min(1),
    isManagementRequest: z.boolean(),
  }),
]);

class RemoveUsersFromOrganisationAccount {
  @logAttempt
  public async execute(payload: z.infer<typeof payloadSchema>) {
    const { accountId, userIds, emails, requesterUserId, isManagementRequest } =
      payloadSchema.parse(payload);

    await OrganisationAuthorizerService().execute({
      accountId,
      requesterUserId,
      bypassAuthorization: isManagementRequest,
    });

    if (userIds) {
      const removedUserIds = await allPromisesSettled(
        userIds.map(async (userId) => {
          try {
            await OrganisationAccountUserService().remove({
              accountId,
              userId,
              requesterUserId,
            });
            return userId;
          } catch (error) {
            // in case of error we want to continue with the rest of the users
            return "";
          }
        })
      );

      return {
        removedUserIds: removedUserIds.filter((userId) => userId),
        removedEmails: [],
      };
    } else if (emails) {
      const removedEmails = await allPromisesSettled(
        emails.map(async (email) => {
          const user = await GetUserService().execute({ email });
          //   we want to skip if the user is not found
          if (!user) return "";

          try {
            await OrganisationAccountUserService().remove({
              accountId,
              userId: user.userId,
              requesterUserId,
            });
            return email;
          } catch (error) {
            // in case of error we want to continue with the rest of the users
            return "";
          }
        })
      );

      return {
        removedEmails: removedEmails.filter((email) => email),
        removedUserIds: [],
      };
    }

    return { removedUserIds: [], removedEmails: [] };
  }
}

export const RemoveUsersFromOrganisationAccountService = makeOnce(
  () => new RemoveUsersFromOrganisationAccount()
);
