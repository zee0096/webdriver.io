const DeleteUserPage = require('../../pages/utils/deleteuser.page');

const entriesToDeletePattern = DeleteUserPage.SF_ARGS.entriesToDeletePattern ?? 'qatest+ob202';

describe(`${DeleteUserPage.RETAILER} Delete Rep`, () => {
  it('C84755 Delete All Reps and Invitations', () => {
    DeleteUserPage.openBoAndLoginByRole(DeleteUserPage.ROLE.admin, false);
    DeleteUserPage.openUsersPhpPage();
    DeleteUserPage.deleteRepsAndInvitationsByEmail(entriesToDeletePattern);
  });
});
