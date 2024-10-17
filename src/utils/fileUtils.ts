/**
 * Convert a base64 string to a Blob object
 * @param base64String
 * @param fileName
 * @param mimeType
 */
export function base64ToFile(base64String: string, fileName: string, mimeType: string) {
    const byteString = atob(base64String.split(',')[1]) // Remove the data URL part
    const arrayBuffer = new ArrayBuffer(byteString.length)
    const uint8Array = new Uint8Array(arrayBuffer)

    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i)
    }

    const blob = new Blob([arrayBuffer], { type: mimeType })
    return new File([blob], fileName, { type: mimeType })
}

/**
 * Convert base64 string to a JPEG file
 * @param base64String
 * @param fileName
 */
export function base64ToJpegFile(base64String: string, fileName: string) {
    return base64ToFile(base64String, fileName, 'image/jpeg')
}
