import { test, expect } from "../core/myTest";

test.describe("Account", () => {
  test.beforeEach(async ({ accountPage }) => {
    await accountPage.gotoAccountPage();
  });

  test("Successful update of avatar", async ({ page, accountPage }) => {
    const request = page.waitForResponse("https://api.welcometothejungle.com/api/v1/registrations");
    await test.step("Update avatar", async () => {
      await accountPage.updateAvatarSuccessful();
    });

    await test.step("Check if avatar is updated", async () => {
      const response = await request;
      await expect(response.ok()).toBeTruthy();
    });
  });

  test("Unsuccessful update of avatar", async ({ page, accountPage }) => {
    await test.step("Update avatar", async () => {
      await accountPage.updateAvatarUnsuccessful();
    });

    await test.step("Check if avatar is not updated", async () => {
      const errorMessage = page.locator("div").filter({ hasText: /^Format non pris en charge\. Vous pouvez télécharger : gif, jpeg, png$/ });
      await expect(errorMessage).toHaveText(/^Format non pris en charge\. Vous pouvez télécharger : gif, jpeg, png$/);
    });
  });

  test("Update avatar with invalid file", async ({ page, accountPage }) => {
    await test.step("Update avatar", async () => {
      await accountPage.updateAvatarWithInvalidFile();
    });

    await test.step("Check if avatar is not updated", async () => {
      const errorMessage = page.locator("div").filter({ hasText: /^Format non pris en charge\. Vous pouvez télécharger : gif, jpeg, png$/ });
      await expect(errorMessage).toHaveText(/^Format non pris en charge\. Vous pouvez télécharger : gif, jpeg, png$/);
    });
  });

  test("Update avatar with large file", async ({ page, accountPage }) => {
    await test.step("Update avatar", async () => {
      await accountPage.updateAvatarWithLargeFile();
    });

    await test.step("Check if avatar is not updated", async () => {
      const errorMessage = page.locator("div").filter({ hasText: /^Fichier trop lourd\. Vous ne pouvez pas dépasser : 1\.00 MB$/ });
      await expect(errorMessage).toHaveText(/^Fichier trop lourd\. Vous ne pouvez pas dépasser : 1\.00 MB$/);
    });
  });
});
