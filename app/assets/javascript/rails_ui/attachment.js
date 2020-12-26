/*
* Input Field with Attachment
*/

export default class InputAttachment {

  /**
   * Default configuration options
   *
   * @type {Object}
   */
  static defaults = {
    /**
     * URL where the file will be send
     */
    uploadUrl: 'upload_attachment.php',

    /**
     * Which method will be used to send the file to the upload URL
     */
    uploadMethod: 'POST',

    /**
     * Name in which the file will be placed
     */
    uploadFieldName: 'file',

    uploadFileInput: '',

    templateDiv: 'file_template',

    /**
     * Extension which will be used when a file extension could not
     * be detected
     */
    defaultExtension: 'png',

    /**
     * JSON field which refers to the uploaded file URL
     */
    jsonFieldName: 'filename',

    /**
     * Allowed MIME types
     */
    allowedTypes: [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/gif'
    ],

    /**
     * Text which will be inserted when dropping or pasting a file.
     * Acts as a placeholder which will be replaced when the file is done with uploading
     */
    progressText: '![Uploading file...]()',

    /**
     * When a file has successfully been uploaded the progressText
     * will be replaced by the urlText, the {filename} tag will be replaced
     * by the filename that has been returned by the server
     */
    urlText: "![file]({filename})",

    /**
     * Text which will be used when uploading has failed
     */
    errorText: 'Error uploading file',

    /**
     * Extra parameters which will be send when uploading a file
     */
    extraParams: {},

    /**
     * Extra headers which will be send when uploading a file
     */
    extraHeaders: {},

    /**
     * Before the file is send
     */
    beforeFileUpload() {
      return true;
    },

    /**
     * Triggers when a file is dropped or pasted
     */
    onFileReceived() {

    },

    /**
     * Custom upload handler
     *
     * @return {Boolean} when false is returned it will prevent default upload behavior
     */
    onFileUploadResponse() {
      return true;
    },

    /**
     * Custom error handler. Runs after removing the placeholder text and before the alert().
     * Return false from this function to prevent the alert dialog.
     *
     * @return {Boolean} when false is returned it will prevent default error behavior
     */
    onFileUploadError() {
      return true;
    },

    /**
     * When a file has successfully been uploaded
     */
    onFileUploaded() {}
  };

  constructor(options) {
    this.settings = Object.assign(InputAttachment.defaults, options);
    this.editor = this.settings['editor'];
    this.filenameTag = '{filename}';
    this.lastValue = null;
  };

  /**
   * Uploads the blob
   *
   * @param  {Blob} file blob data received from event.dataTransfer object
   * @return {XMLHttpRequest} request object which sends the file
   */
  uploadFile(file) {
    let me = this
    let formData = new FormData()
    let xhr = new XMLHttpRequest()
    let settings = this.settings
    let extension = settings.defaultExtension

    if (typeof settings.setupFormData === 'function') {
      settings.setupFormData(formData, file);
    }

    // Attach the file. If coming from clipboard, add a default filename (only works in Chrome for now)
    // http://stackoverflow.com/questions/6664967/how-to-give-a-blob-uploaded-as-formdata-a-file-name
    if (file.name) {
      var fileNameMatches = file.name.match(/\.(.+)$/);
      if (fileNameMatches) {
        extension = fileNameMatches[1];
      }
    }

    var remoteFilename = 'image-' + Date.now() + '.' + extension;
    if (typeof settings.remoteFilename === 'function') {
      remoteFilename = settings.remoteFilename(file);
    }

    formData.append(settings.uploadFieldName, file, remoteFilename);

    // Append the extra parameters to the form data
    if (typeof settings.extraParams === 'object') {
      for (var key in settings.extraParams) {
        if (settings.extraParams.hasOwnProperty(key)) {
          formData.append(key, settings.extraParams[key]);
        }
      }
    }

    xhr.open('POST', settings.uploadUrl);

    // Add any available extra headers
    if (typeof settings.extraHeaders === 'object') {
        for (var header in settings.extraHeaders) {
            if (settings.extraHeaders.hasOwnProperty(header)) {
                xhr.setRequestHeader(header, settings.extraHeaders[header]);
            }
        }
    }

    xhr.onload = function() {
      // If HTTP status is OK or Created
      if (xhr.status === 200 || xhr.status === 201) {
        me.onFileUploadResponse(xhr);
      } else {
        me.onFileUploadError(xhr);
      }
    };
    if (settings.beforeFileUpload(xhr) !== false) {
      xhr.send(formData);
    }
    return xhr;
  };



  /**
   * Returns if the given file is allowed to handle
   *
   * @param {File} file clipboard data file
   */
  isFileAllowed(file) {
    if (file.kind === 'string') { return false; }
    if (this.settings.allowedTypes.indexOf('*') === 0){
      return true;
    } else {
      return this.settings.allowedTypes.indexOf(file.type) >= 0;
    }
  };

  /**
   * Handles upload response
   *
   * @param  {XMLHttpRequest} xhr
   * @return {void}
   */
  onFileUploadResponse(xhr) {
    if (this.settings.onFileUploadResponse.call(this, xhr) !== false) {
      var result = JSON.parse(xhr.responseText),
        filename = result[this.settings.jsonFieldName];

      if (result && filename) {
        var newValue;
        if (typeof this.settings.urlText === 'function') {
          newValue = this.settings.urlText.call(this, filename, result);
        } else {
          newValue = this.settings.urlText.replace(this.filenameTag, filename);
        }
        this.editor.value.replace(this.lastValue, newValue);
        this.settings.onFileUploaded.call(this, filename, result);
      }
    }
  };


  /**
   * Called when a file has failed to upload
   *
   * @param  {XMLHttpRequest} xhr
   * @return {void}
   */
  onFileUploadError(xhr) {
    if (this.settings.onFileUploadError.call(this, xhr) !== false) {
      this.editor.value.replace(this.lastValue, '');
    }
  };

  /**
   * Called when a file has been inserted, either by drop or paste
   *
   * @param  {File} file
   * @return {void}
   */
  onFileInserted(file) {
    if (this.settings.onFileReceived.call(this, file) !== false) {
      this.lastValue = this.settings.progressText;

      var scrollPos = el.scrollTop;
      el.value = this.lastValue;
      el.scrollTop = scrollPos;
    }
  };


  onFileInputChange(e) {
    var result = false;
    for (var i = 0; i < e.target.files.length; i++) {
      var file = e.target.files[i];
      if (this.isFileAllowed(file)) {
        result = true;
        this.uploadFile(file);
      }
    }

    return result;
  };

  imagePreview(e, previewDiv){
    var result = false;

    for (var i = 0; i < e.target.files.length; i++) {
      var file = e.target.files[i];
      if (this.isFileAllowed(file)) {
        result = true;
        this.previewFile(file, previewDiv);
      }
    }

    return result;
  };

  onFileInputClick(e) {
    console.log('fileInputClick', e)
  };

}
