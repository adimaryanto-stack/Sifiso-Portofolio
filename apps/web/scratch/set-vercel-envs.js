const { execSync } = require("child_process");

const envs = [
  {
    name: "DATABASE_URL",
    value: "postgresql://neondb_owner:npg_JnjCOp1T3ZMx@ep-odd-boat-aofdbo2c-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require"
  },
  {
    name: "POSTGRES_URL",
    value: "postgresql://neondb_owner:npg_JnjCOp1T3ZMx@ep-odd-boat-aofdbo2c-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require"
  },
  {
    name: "BETTER_AUTH_SECRET",
    value: "sf_bd881a942eb4dc0ca3f5923b7b43a9f0322"
  },
  {
    name: "BETTER_AUTH_URL",
    value: "https://sifiso-portofolio-web.vercel.app"
  }
];

envs.forEach((env) => {
  try {
    console.log(`Setting ${env.name} on Vercel...`);
    // Format: vercel env add <name> <environment> --value <value> --yes
    execSync(`npx vercel env add ${env.name} production --value "${env.value}" --yes`, { stdio: "inherit" });
    execSync(`npx vercel env add ${env.name} preview --value "${env.value}" --yes`, { stdio: "inherit" });
    console.log(`✅ successfully set ${env.name}`);
  } catch (err) {
    console.error(`❌ failed to set ${env.name}:`, err.message);
  }
});

console.log("All environment variables set. Triggering redeploy...");
