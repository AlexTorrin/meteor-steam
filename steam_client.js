Steam = {};

Steam.requestCredential = function(options, credentialRequestCompleteCallback) {
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'steam'});
  if (!config) {
    if(credentialRequestCompleteCallback) {
      // service must be configured otherwise OAuth package would throw another error down the road anyway
      credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError('Service not configured.'));
    }
    return;
  }

  var credentialToken = Random.secret();
  var loginStyle = OAuth._loginStyle('steam', config, options);
  var state = OAuth._stateParam(loginStyle, credentialToken, options ? options.redirectUrl : undefined);
  var redirectUri = OAuth._redirectUri('steam', config, {state: state}, config.absoluteUrl);

  var loginUrl = 'https://steamcommunity.com/openid/login' +
      '?openid.ns=http://specs.openid.net/auth/2.0' +
      '&openid.mode=checkid_setup' +
      '&openid.return_to=' + redirectUri +
      '&openid.realm=' + Meteor.absoluteUrl(config.absoluteUrlRealm) +
      '&openid.ns.sreg=http://openid.net/extensions/sreg/1.1' +
      '&openid.identity=http://specs.openid.net/auth/2.0/identifier_select' +
      '&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select' +
      '&state=' + state;

  OAuth.launchLogin({
    loginService: 'steam',
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken
  });
};
