const repName = 'test_rep1';

module.exports = {
  changedStoreCity : 'Montreal', // Based on geo_id, the store chosen in sidebar landing page
  changedChatStore : 'Montreal - Fake Mall', // Default store populated when chosen chat service
  geo_ip           : '35.182.254.186',
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 5 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 5 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],
};
