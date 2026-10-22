import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data/marketingConfig.json");

export async function getMarketingConfig() {
  try {
    if (!fs.existsSync(filePath)) {
      return { meta: {}, google: {}, tiktok: {} };
    }
    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading marketing config:", error);
    return null;
  }
}

export async function saveMarketingConfig(platform, data) {
  try {
    const currentConfig = await getMarketingConfig();
    currentConfig[platform] = { ...currentConfig[platform], ...data };

    fs.writeFileSync(filePath, JSON.stringify(currentConfig, null, 2));
    return {
      success: true,
      message: `${platform.toUpperCase()} settings updated successfully!`,
    };
  } catch (error) {
    console.error("Error saving config:", error);
    return { success: false, message: "Failed to update settings." };
  }
}
