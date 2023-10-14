export const dynamic = "force-dynamic";
import fs from "fs";
import path from "path";

type Feedback = {
  name?: string;
  data: string;
  roll?: string;
};

async function loadAllTextFiles() {
  const p = path.join(process.cwd(), "data");
  const files = fs.readdirSync(p);
  const contentArray: Feedback[] = [];
  for (const file of files) {
    if (file.endsWith(".txt")) {
      const fileName = file.split(".")[0];
      const content = fs.readFileSync(`${p}/${file}`, "utf-8");
      contentArray.push({
        data: content,
        name: fileName.split("-")[0]?.trim(),
        roll: fileName.split("-")[1]?.trim(),
      });
    }
  }
  return contentArray;
}

function ReviewCard({ data, name, roll }: Feedback) {
  return (
    <figure className="md:flex md:h-48 bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-200">
      <img
        className="w-24 h-24 md:w-48 md:h-auto md:rounded-xl md:rounded-r-none rounded-full mx-auto"
        src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${
          name || roll
        }&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,d1d4f9`}
      />
      <div className="pt-6 md:p-8 text-center md:text-left space-y-4 flex-1 flex justify-between flex-col">
        <blockquote className="flex-1">
          <p className="text-lg font-medium">{data}</p>
        </blockquote>
        <figcaption className="font-medium">
          <div className="text-sky-500 dark:text-sky-400">
            {name || "Anonymous"}
          </div>
          <div className="text-slate-700 dark:text-slate-500">{roll || ""}</div>
        </figcaption>
      </div>
    </figure>
  );
}

export default async function Home() {
  // Loading text files
  const contentArray: Feedback[] = await loadAllTextFiles();
  return (
    <div className="relative flex min-h-screen bg-gray-100 text-gray-800 py-6 sm:py-12">
      <div className="container mx-auto max-w-screen-xl px-6 xl:p-0">
        <h1 className="w-full md:text-left text-center text-4xl font-bold mb-8">
          Workshop Feedback
        </h1>
        <div className="flex flex-col gap-4">
          {contentArray.length === 0 && <p>No feedback yet!</p>}
          {contentArray.length === 0 ||
            contentArray.map((feedback) => (
              <ReviewCard key={feedback.roll || feedback.name} {...feedback} />
            ))}
        </div>
      </div>
    </div>
  );
}
