import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const width of [360, 768, 1440]) {
  test(`${width}px: sections, links, no overflow, accessibility`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "한 스푼.",
    );
    await expect(page.getByText("개발 중", { exact: true })).toHaveCount(2);
    await expect(page.locator(".product-card")).toHaveCount(2);
    await expect(page.locator(".contact-links a").first()).toHaveAttribute(
      "href",
      "mailto:taechef0927@naver.com",
    );
    await expect(page.locator(".contact-links a").nth(1)).toHaveAttribute(
      "href",
      "tel:+821071589345",
    );
    await expect(
      page.getByRole("link", { name: "이메일로 협력 문의" }),
    ).toHaveAttribute("href", /^mailto:taechef0927@naver.com\?subject=/);
    for (const id of ["story", "products", "table", "partners", "contact"])
      await expect(page.locator(`#${id}`)).toBeVisible();
    const broken = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .map((a) => a.getAttribute("href")!)
          .filter((h) => !document.getElementById(h.slice(1))),
      );
    expect(broken).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/home-${width}.png`,
      fullPage: true,
    });
    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(axe.violations).toEqual([]);
    for (const id of ["story", "products", "table", "partners", "contact"]) {
      if (width < 701) await page.locator(".menu-toggle").click();
      await page.locator(`nav a[href="#${id}"]`).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      expect(await page.locator(`#${id}`).evaluate(el => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(78);
    }
    await page.locator(".hero-actions a").first().click();
    await expect(page).toHaveURL(/#products$/);
    await page.locator(".hero-actions a").nth(1).click();
    await expect(page).toHaveURL(/#partners$/);
    await page.getByRole("link", {name: "개인정보 안내", exact: true}).click();
    await expect(page.getByRole("heading", {level: 1})).toHaveText("개인정보 안내");
    expect(errors).toEqual([]);
  });
}
test("mobile menu click, Escape, focus and keyboard skip link", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "본문으로 바로가기" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  const toggle = page.locator(".menu-toggle");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "우리의 페스토" })
    .click();
  await expect(page).toHaveURL(/#products$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(axe.violations).toEqual([]);
});
for (const [path, title] of [
  ["/privacy/", "개인정보 안내"],
  ["/missing-page", "잠시, 다른 길로 왔네요."],
  ["/404.html", "잠시, 다른 길로 왔네요."],
]) {
  test(`direct page ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    await expect(
      page.getByRole("link", { name: "홈으로 돌아가기" }),
    ).toHaveAttribute("href", "/");
    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(axe.violations).toEqual([]);
    await page.getByRole("link", { name: "홈으로 돌아가기" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "한 스푼.",
    );
  });
}
