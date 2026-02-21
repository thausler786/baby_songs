# Songs for Babies

A simple website to share lullabies and songs collected from friends and family.

## Adding Songs

1. **Add the audio file:** Place your MP3 file in the `audio/` folder

2. **Update the song list:** Open `songs.js` and add an entry to the `songs` array:

```javascript
{
    title: "Song Title",
    singer: "Person's Name",
    audioUrl: "audio/filename.mp3"
}
```

3. **Commit and push** to see your changes on the live site

## Local Preview

Open `index.html` in your browser to preview the site locally.

## Deploying to GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** > **Pages**
3. Under "Source", select **main** branch
4. Click **Save**
5. Your site will be live at `https://yourusername.github.io/baby_songs`

## File Structure

```
baby_songs/
├── index.html    # Main page
├── styles.css    # Styling
├── songs.js      # Song data and player logic
├── audio/        # MP3 files go here
└── README.md     # This file
```
