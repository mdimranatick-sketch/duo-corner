const fs = require("fs");
const path = require("path");

// স্ক্যান করার জন্য ফোল্ডারের তালিকা
const targetDirs = ["app", "components", "api", "pages", "utils", "lib"];
let totalFiles = 0;
let issuesFound = [];

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (
      file.endsWith(".js") ||
      file.endsWith(".ts") ||
      file.endsWith(".tsx") ||
      file.endsWith(".jsx")
    ) {
      totalFiles++;
      checkFileContent(fullPath);
    }
  });
}

function checkFileContent(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  // ১. মিসিং রুট বা ভুল ফেচ পাথ চেক (যেমন: ফেচ করা হচ্ছে কিন্তু স্লাশ মিসিং)
  if (content.includes('fetch("/api/') && content.includes("//")) {
    issuesFound.push(
      `[Path Warning] সম্ভাব্য ভুল API পাথ থাকতে পারে: ${filePath}`,
    );
  }

  // ২. আনইউজড বা কমেন্ট করা কোড বা ডেড কোড চেক
  if (content.includes("console.log") || content.includes("debugger")) {
    issuesFound.push(
      `[Clean Code] ডিবাগিং কোড (console.log/debugger) রয়ে গেছে: ${filePath}`,
    );
  }

  // ৩. রুট পাথ বা ইমপোর্ট মিসিং চেক (Relative path errors)
  const importLines = content
    .split("\n")
    .filter((line) => line.trim().startsWith("import"));
  importLines.forEach((line) => {
    if (line.includes("'./") || line.includes('"./')) {
      // সাধারণ পাথ চেক করার লজিক
      const match = line.match(/['"]([^'"]+)['"]/);
      if (match) {
        const importPath = match[1];
        const dirName = path.dirname(filePath);
        const resolvedPath = path.resolve(dirName, importPath);
        // এক্সটেনশন সহ বা ছাড়া চেক করা
        const exists =
          fs.existsSync(resolvedPath) ||
          fs.existsSync(resolvedPath + ".js") ||
          fs.existsSync(resolvedPath + ".ts") ||
          fs.existsSync(resolvedPath + ".tsx");
        if (!exists) {
          issuesFound.push(
            `[Missing Import/Route Path] ফাইল বা পাথ খুঁজে পাওয়া যায়নি: ${filePath} -> ইমপোর্ট: ${importPath}`,
          );
        }
      }
    }
  });
}

console.log("🔍 প্রজেক্ট স্ক্যান শুরু হচ্ছে...");
targetDirs.forEach((dir) => scanDirectory(dir));

console.log(`\n📊 স্ক্যান সম্পন্ন! মোট ফাইল চেক করা হয়েছে: ${totalFiles} টি`);
console.log(`⚠️ প্রাপ্ত ইস্যু এবং মিসিং পাথসমূহ (${issuesFound.length} টি):\n`);

if (issuesFound.length === 0) {
  console.log(
    "✨ অভিনন্দন! প্রজেক্টে বড় কোনো মিসিং পাথ বা ইমপোর্ট ইস্যু পাওয়া যায়নি।",
  );
} else {
  issuesFound.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue}`);
  });
}
