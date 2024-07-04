import { simpleEmailAuthorizer } from "apis/management-api/simpleEmailAuthorizer";
import { RemoveUsersFromOrganisationAccountService } from "domain/b2b/RemoveUsersFromOrganisationAccount";

import { managementBuilder } from "../managementBuilder";

interface RemoveUsersFromOrganisationAccountResponse {
  removedUserIds: string[];
  removedEmails: string[];
}

export const RemoveUsersFromOrganisationAccountResult = managementBuilder
  .objectRef<RemoveUsersFromOrganisationAccountResponse>(
    "RemoveUsersFromOrganisationAccountResult"
  )
  .implement({
    fields: (t) => ({
      removedUserIds: t.exposeStringList("removedUserIds"),
      removedEmails: t.exposeStringList("removedEmails"),
    }),
  });

managementBuilder.mutationField("removeUsersFromOrganisationAccount", (t) =>
  t.withAuth({ email: true }).fieldWithInput({
    type: RemoveUsersFromOrganisationAccountResult,
    input: {
      accountId: t.input.string({ required: true }),
      emails: t.input.stringList({ required: false }),
      userIds: t.input.stringList({ required: false }),
    },
    errors: {
      types: [Error],
    },
    resolve: async (root, { input }, { email }) => {
      const requesterUserId = await simpleEmailAuthorizer.getUserId(email);

      if (input.userIds) {
        return RemoveUsersFromOrganisationAccountService().execute({
          accountId: input.accountId,
          userIds: input.userIds,
          requesterUserId,
          isManagementRequest: true,
        });
      } else if (input.emails) {
        return RemoveUsersFromOrganisationAccountService().execute({
          accountId: input.accountId,
          emails: input.emails,
          requesterUserId,
          isManagementRequest: true,
        });
      }

      throw new Error("Either userIds or emails must be provided");
    },
  })
);
