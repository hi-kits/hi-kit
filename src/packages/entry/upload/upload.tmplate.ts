/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-07-05 16:51:16
 * @LastEditors: liulina
 * @LastEditTime: 2022-07-08 17:27:55
 */
import { html, ref, when, repeat } from 'hi-element';
import type { HiUpload } from './upload';

export const template = html<HiUpload>`
  <div>
    <a class="uploader-browse" ${ref('fileSelect')}><u>select from your computer</u></a>
  </div>
  <div class="uploader-progress" ${ref('allfileProgress')}>
    <table>
      <tr>
        <td width="100%"><div class="progress-container"><div class="progress-bar"></div></div></td>
        <td class="progress-text" nowrap="nowrap"></td>
        <td class="progress-pause" nowrap="nowrap">
          <a href="javascript:;" @click="${x => x.allFilUploader.upload()}" class="progress-resume-link">
            <svg class="icon" viewBox="0 0 1024 1024">
              <path d="M442.3 677.6l199.4-156.7c5.7-4.5 5.7-13.1 0-17.7L442.3 346.4c-7.4-5.8-18.3-0.6-18.3 8.8v313.5c0 9.4 10.9 14.7 18.3 8.9z"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32z m-40 728H184V184h656v656z"></path>
            </svg>
          </a>
          <a href="javascript:;" @click="${x =>x.allFilUploader.pause()}" class="progress-pause-link">
            <svg class="icon" viewBox="0 0 1024 1024">
              <path d="M304 176h80v672h-80zM712 176h-64c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8z"></path>
            </svg>
          </a>
          <a href="javascript:;" @click="${x => x.allFilUploader.cancel()}" class="progress-cancel-link">
            <svg class="icon" viewBox="0 0 1024 1024">
              <path d="M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-0.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
          </svg>
          </a>
        </td>
      </tr>
    </table>
  </div>
  <p>${ x => x.showUploadList }</p>
  <ul class="uploader-list"  ${ref('uploaderList')}>
  ${repeat(
    x => x.uploadQueue,
    html`
    <li class="uploader-file">
      Uploading
      <span class="uploader-file-name">${ x=> x.name}</span>
      <span class="uploader-file-size">${ (x, c)=> x.getFormatSize()}</span>
      <span class="uploader-file-progress"> ${ x => x.uploadMessage }</span>
      <span class="uploader-file-pause" @click="${(x, c) => c.parent.filePauseHandler(x, c.event)}">
        <svg class="icon" viewBox="0 0 1024 1024">
          <path d="M304 176h80v672h-80zM712 176h-64c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8z"></path>
        </svg>
      </span>
      <span class="uploader-file-resume"  @click="${(x, c) => c.parent.fileResumeHandler(x, c.event)}">
        <svg class="icon" viewBox="0 0 1024 1024">
          <path d="M442.3 677.6l199.4-156.7c5.7-4.5 5.7-13.1 0-17.7L442.3 346.4c-7.4-5.8-18.3-0.6-18.3 8.8v313.5c0 9.4 10.9 14.7 18.3 8.9z"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32z m-40 728H184V184h656v656z"></path>
        </svg>
      </span>
      <span class="uploader-file-cancel" @click="${(x, c) => c.parent.fileCancelHandler(x, c.event)}">
        <svg class="icon" viewBox="0 0 1024 1024">
          <path d="M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-0.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
        </svg>
      </span>
    </li>`
  )}
  </ul>
`;


