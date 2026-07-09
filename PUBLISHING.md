# Publishing this Portfolio to GitHub Pages

This guide shows how to publish this site and replace your existing portfolio at
**https://sirfowahid.github.io/**.

Your current site is a **GitHub user site**, served from a repo named exactly
`sirfowahid.github.io`. To replace it, you push this code into that same repo.

> You only need a terminal. Commands are run from the project folder:
> `/Users/mehedi/Downloads/Portfolio/files (3)`

---

## 0. One-time: install prerequisites (skip if already done)

- **Git** — check with `git --version`. If missing, install Xcode tools: `xcode-select --install`.
- **A GitHub account** — you already have one (`sirfowahid`).
- **(Optional) GitHub CLI** — makes login easy. Check with `gh --version`.
  Install: `brew install gh` (needs Homebrew).

---

## 1. (Recommended) Back up your current live site

Keep a copy of the old portfolio before overwriting it:

```bash
git clone https://github.com/sirfowahid/sirfowahid.github.io.git ~/old-portfolio-backup
```

If it clones, your old site is safely saved in `~/old-portfolio-backup`.

---

## 2. Set your Git identity

Run these once (already partly set, but confirm they are correct):

```bash
git config user.name "Md. Mehedi Hasan"
git config user.email "your-github-email@example.com"
```

Use the email attached to your GitHub account. To keep it private, you can use
GitHub's no-reply address: `sirfowahid@users.noreply.github.com`.

---

## 3. Verify the local repository

This project is already a Git repo with a first commit. Confirm:

```bash
git status
git log --oneline -1
```

You should see a branch called `main` and one commit. If `git status` says
"not a git repository", run:

```bash
git init
git branch -M main
git add -A
git commit -m "Portfolio site"
```

---

## 4. Log in to GitHub

**Option A — GitHub CLI (easiest):**

```bash
gh auth login
```

Choose: **GitHub.com → HTTPS → Login with a web browser**, then paste the code.

**Option B — Personal Access Token (if you don't use `gh`):**

1. Go to GitHub → **Settings → Developer settings → Personal access tokens →
   Tokens (classic) → Generate new token (classic)**.
2. Give it a name, set an expiry, and check the **`repo`** scope.
3. Generate and **copy the token** (you won't see it again).
4. When `git push` later asks for a password, paste this **token** (not your
   account password). Username is `sirfowahid`.

---

## 5. Connect this project to your GitHub repo

Link the local repo to your existing user-site repo:

```bash
git remote add origin https://github.com/sirfowahid/sirfowahid.github.io.git
```

If it says the remote already exists, update it instead:

```bash
git remote set-url origin https://github.com/sirfowahid/sirfowahid.github.io.git
```

Confirm:

```bash
git remote -v
```

---

## 6. Push and replace the old site

Because the old repo has a different history, force-push your new site onto it:

```bash
git push -u origin main --force
```

- If prompted for username/password, use `sirfowahid` and your **token** (Step 4B).
- `--force` overwrites the old site with this one. (That's why we backed up in Step 1.)

---

## 7. Configure GitHub Pages

1. Open your repo on GitHub: `https://github.com/sirfowahid/sirfowahid.github.io`
2. Go to **Settings → Pages**.
3. Under **Build and deployment**:
   - **Source:** *Deploy from a branch*
   - **Branch:** `main` and folder **`/ (root)`**
   - Click **Save**.

A `.nojekyll` file is already included so GitHub serves the files as-is.

---

## 8. View your live site

Wait about 1–2 minutes for the build, then open:

**https://sirfowahid.github.io/**

Hard-refresh to bypass the cache: **Cmd + Shift + R**.

---

## 9. Before you go live — replace placeholder files

These paths are referenced by the site but not yet added. Add the real files so
links don't 404:

- **CV:** put your PDF at `assets/static/Md_Mehedi_Hasan_CV.pdf`
- **Certificates / blog PDFs:** put files in `assets/static/` and update the
  paths in `js/data.js` (e.g. `file: "assets/static/pytorch-cert.pdf"`).
- **Images:** drop real images into `assets/images/` and set the matching
  `image:` / `heroPhoto:` paths in `js/data.js` (empty `""` shows a placeholder).

---

## 10. Updating the site later

Whenever you change content (usually just `js/data.js`) or add files:

```bash
git add -A
git commit -m "Update content"
git push
```

GitHub Pages redeploys automatically within a minute or two.

---

## Troubleshooting

- **Old site still shows:** hard-refresh (Cmd+Shift+R), or wait a few minutes;
  Pages builds can lag. Check **Settings → Pages** for the latest deployment.
- **404 on the whole site:** confirm Pages **Branch = `main` / root**, and that
  `index.html` is in the repo root (`git ls-files | grep index.html`).
- **Broken images/PDFs:** the file paths in `js/data.js` must match real files in
  `assets/`. Paths are case-sensitive on GitHub.
- **`push` rejected:** you likely need to authenticate — redo Step 4, then push
  again. If it rejects due to history, ensure you included `--force`.
- **Wrong author on commits:** re-run Step 2, then make a new commit.

---

## Command summary (copy/paste)

```bash
# from the project folder
git config user.name "Md. Mehedi Hasan"
git config user.email "your-github-email@example.com"

# (optional) back up old site
git clone https://github.com/sirfowahid/sirfowahid.github.io.git ~/old-portfolio-backup

# log in (choose one)
gh auth login                 # Option A
# or use a Personal Access Token when prompted for a password (Option B)

# connect and publish
git remote add origin https://github.com/sirfowahid/sirfowahid.github.io.git
git push -u origin main --force

# later updates
git add -A && git commit -m "Update content" && git push
```
