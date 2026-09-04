# Update time on edit plugin

This plugin update on save the metadata of the file with the time it was updated, and the time of creation if there is none (useful for new files).

Here is a list of feature this plugin provides :

- Keep in sync the `mtime` (last modified time) in a property key (default to `updated`)
- Keep in sync the `ctime` (file creation time) in a property key (default to `created`)
- Customize the date format, default to obsidian date format for property display
- Supports string and number property data types, the later being useful for Unix timestamps
- Ignore folder for all update, useful for template files
- Ignore folder for the creation property
- Works on mobile & desktop

This plugin will read the `ctime` and `mtime` from obsidian, and thus, the file system. **If file change from an external source, the header keys will be updated**.

Remember to backup your vault since this plugin will modify files.

## Installing locally (from source)

To try an unreleased build (e.g. this branch) in your own vault:

1. Clone the repo and install dependencies:
   ```sh
   git clone https://github.com/beaussan/update-time-on-edit-obsidian.git
   cd update-time-on-edit-obsidian
   npm install
   ```
2. Build the plugin:
   ```sh
   npm run build
   ```
   This produces `main.js`, `manifest.json`, and `styles.css` in the repo root.
3. Copy those three files into `<YourVault>/.obsidian/plugins/update-time-on-edit/` (create the folder if it doesn't exist).
   - On macOS/Linux you can symlink instead, so rebuilds show up without re-copying:
     ```sh
     mkdir -p <YourVault>/.obsidian/plugins/update-time-on-edit
     ln -sf "$(pwd)"/{main.js,manifest.json,styles.css} <YourVault>/.obsidian/plugins/update-time-on-edit/
     ```
4. In Obsidian, go to **Settings → Community plugins**, make sure "Restricted mode" is off, then find "Update time on edit" and enable it.
5. After making further changes, run `npm run dev` (watches and rebuilds `main.js` on save) and reload Obsidian (`Cmd/Ctrl+R` or close/reopen the vault) to pick up the new build.

If you keep your vault in git, you can safely add `.obsidian/plugins/update-time-on-edit/cache.json` to your `.gitignore`. It only holds the plugin's internal file-hash cache (used by the experimental hash matcher) and is regenerated automatically; your actual settings stay in `data.json` in the same folder.
