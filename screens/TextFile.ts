import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const gifDir = FileSystem.cacheDirectory + 'giphy/';
const gifFileUri = (gifId: string) => gifDir + `gif_${gifId}_200.gif`;

// see https://developers.giphy.com/docs/api/schema#image-object
const gifUrl = (gifId: string) => `https://media1.giphy.com/media/${gifId}/200.gif`;

/**
 * Helper function
 * Checks if gif directory exists. If not, creates it
 */
async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(gifDir);
  if (!dirInfo.exists) {
    console.log("Gif directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(gifDir, { intermediates: true });
  }
}

/**
 * Downloads all gifs specified as array of IDs
 */
export async function addMultipleGifs(gifIds: string[]) {
  try {
    await ensureDirExists();

    console.log('Downloading', gifIds.length, 'gif files...');
    await Promise.all(gifIds.map(id => FileSystem.downloadAsync(gifUrl(id), gifFileUri(id))));
  } catch (e) {
    console.error("Couldn't download gif files:", e);
  }
}

/**
 * Returns URI to our local gif file
 * If our gif doesn't exist locally, it downloads it
 */
export async function getSingleGif(gifId: string) {
  await ensureDirExists();

  const fileUri = gifFileUri(gifId);
  const fileInfo = await FileSystem.getInfoAsync(fileUri);

  if (!fileInfo.exists) {
    console.log("Gif isn't cached locally. Downloading...");
    await FileSystem.downloadAsync(gifUrl(gifId), fileUri);
  }

  return fileUri;
}

/**
 * Exports shareable URI - it can be shared outside your app
 */
export async function getGifContentUri(gifId: string) {
  return FileSystem.getContentUriAsync(await getSingleGif(gifId));
}

/**
 * Deletes whole giphy directory with all its content
 */
export async function deleteAllGifs() {
  console.log('Deleting all GIF files...');
  await FileSystem.deleteAsync(gifDir);
}


export async function saveTEXTfile(configId: string) {
  

        let fileUri = FileSystem.documentDirectory + "text.txt";
        await FileSystem.writeAsStringAsync(fileUri, configId, { encoding: FileSystem.EncodingType.UTF8 });
        /*
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        await MediaLibrary.createAlbumAsync("Download", asset, false)
        */
        
        console.log('Grabado en: ' + FileSystem.documentDirectory + "text.txt");
  
}
export async function readTEXTfile() {
  

        let fileUri = FileSystem.documentDirectory + "text.txt";
        let keyRead = "latino";
        try{
        keyRead = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });
        console.log('Leido en file:  ' + keyRead);
        return keyRead;
        } catch (e) {
        console.log(e);
        }
        
        return keyRead;
        //return await fetch(keyRead);
       
  
}

