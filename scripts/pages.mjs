import { readFile, writeFile, mkdir } from "node:fs/promises";
const html = await readFile("dist/index.html", "utf8");
for (const [file, title, description] of [
  [
    "privacy/index.html",
    "개인정보 안내 | 슬슬페스토",
    "슬슬페스토의 현재 문의 방식과 개인정보 처리 준비사항을 안내합니다.",
  ],
  [
    "404.html",
    "페이지를 찾을 수 없습니다 | 슬슬페스토",
    "요청하신 페이지를 찾을 수 없습니다. 슬슬페스토 홈으로 이동해 주세요.",
  ],
]) {
  await mkdir(`dist/${file.split("/").slice(0, -1).join("/")}`, {
    recursive: true,
  });
  await writeFile(
    `dist/${file}`,
    html
      .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
      .replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
        `<meta name="description" content="${description}"/>`,
      )
      .replace(
        /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
        `<meta property="og:title" content="${title}"/>`,
      )
      .replace(
        /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
        `<meta property="og:description" content="${description}"/>`,
      ),
  );
}
