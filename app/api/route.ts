import path from "path";
import { promises as fs } from "fs";

async function loadAllTextFiles() {
  const p = path.join(process.cwd(), "app/feedback");
  const files = await fs.readdir(p);
  const contentArray = [];
  for (const file of files) {
    if (file.endsWith(".txt")) {
      const fileName = file.split(".")[0];
      const content = await fs.readFile(`${p}/${file}`, "utf-8");
      contentArray.push({
        data: content,
        name: fileName.split("-")[0]?.trim(),
        roll: fileName.split("-")[1]?.trim(),
      });
    }
  }
  return contentArray;
}

export async function GET() {
  const contentArray = await loadAllTextFiles();
  return Response.json(contentArray);
}
