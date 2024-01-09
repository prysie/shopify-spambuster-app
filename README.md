Instructions to release new version

cd ..\shopify-spambuster-client\
npm run build-prod
Manually copy the spambuster.js file over from build directory
cd ..\shopify-spambuster-app\
npm run shopify app deploy
