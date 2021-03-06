/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-07-05 16:14:21
 * @LastEditors: liulina
 * @LastEditTime: 2022-07-14 17:31:27
 */
import { HIElement, customElement, attr, Observable, observable, DOM } from 'hi-element';
import { UploadStyles as styles } from './upload.style';
import { template } from './upload.tmplate';

const Uploader = require('./_uploader');

@customElement({
  name: 'h-upload',
  template,
  styles
})
export class HiUpload extends HIElement {
  private uploader;
  allFilUploader;
  // 上传接口
  @attr action: string;

  // 接受上传的文件类型
  @attr accept: string;

  // 是否允许重复上传相同文件名的文件
  @attr allowUploadDuplicateFile = false;

  // 是否是选取文件后自动上传
  @attr autoUpload = true;

  // 上传文件时所需的额外的参数
  @attr data: object;

  // 上传文件的请求头部
  @attr headers: object;

  // 是否禁用
  @attr({ mode: 'boolean' }) disabled: boolean = false;

  // 是否启用拖拽上传
  @attr({ mode: 'boolean' }) draggable: boolean = false;

  // 是否启用拖拽上传
  @attr({ mode: 'boolean' }) directory: boolean = false;

  // 是否支持多文件
  @attr({ mode: 'boolean' }) multiple: boolean = false;

  // 是否支持多文件
  @attr name: string = 'file';

  /**
   * 上传组件主题，可选值：custom/file/file-input/file-flow/image/image-flow
   * custom 表示完全自定义风格；
   * file 表示默认文件上传风格；
   * file-input 表示输入框形式的文件上传；
   * file-flow 表示文件批量上传；
   * image 表示默认图片上传风格；
   * image-flow 表示图片批量上传
   * 
   */
  @attr theme: string = 'file';

  /*
    图片文件大小限制，单位 KB。
    可选单位有：'B' | 'KB' | 'MB' | 'GB'。
    示例一：1000。示例二：{ size: 2, unit: 'MB', message: '图片大小不超过 {sizeLimit} MB' }。
  */
  @attr limit : number| object;

  @attr files: Array<any>
  

  // 是否展示待上传文件列表
  @observable
  public showUploadList: boolean = false;
  // 待上传文件列表
  @observable
  public uploadQueue: Array<any>;

  
  // 暂停按钮 
  public showFilePauseBtn: boolean = false;
  // 重新开始上传按钮
  public showFileResumeBtn: boolean = false;




  // 上传文件列表 DOM Ref
  public fileSelect: HTMLHyperlinkElementUtils;
  // 上传文件列表 DOM Ref
  public uploaderList: HTMLUListElement;
  // 可以控制所有上传文件进度的DOM
  public allfileProgress: HTMLDivElement;
  
  // 组件第一次挂载
  connectedCallback(): void {
    super.connectedCallback();
    // 创建上传对象
    this.uploader = new Uploader({
      target: '/upload',
      chunkSize: 1024 * 1024,
      testChunks: true,
      checkChunkUploadedByResponse: (chunk, message) =>{
        var objMessage = {};
        try {
          objMessage = JSON.parse(message);
        } catch (e) {}
        // fake response
        // objMessage.uploaded_chunks = [2, 3, 4, 5, 6, 8, 10, 11, 12, 13, 17, 20, 21]
        // check the chunk is uploaded
        return (objMessage['uploaded_chunks'] || []).indexOf(chunk.offset + 1) >= 0;
      }
    });
    // this.uploader.assignDrop($('.uploader-drop')[0]);
    // 选择文件  domNodes, isDirectory, singleFile, attributes
    this.uploader.assignBrowse(this.fileSelect);
    // this.uploader.assignBrowse($('.uploader-browse-folder')[0], true);
    // this.uploader.assignBrowse($('.uploader-browse-image')[0], false, false, {accept: 'image/*'});


    // 绑定事件
    // Handle file add event
    this.uploader.on('filesAdded',  (files, fileList) => {
      // Show progress bar
      this.showUploadList = true;
      this.uploaderList.style.display = 'block'
      this.allfileProgress.style.display = 'block';
      // 保存文件列表
      this.uploadQueue = fileList;
      fileList.forEach( (file) => {
        // 暂停按钮
        file.showFilePauseBtn = true;
        // 重新上传按钮
        file.showFileResumeBtn = false;
        // 文件列表
        file.showUploadList = true;
      });
    });
    // 提交事件
    this.uploader.on('filesSubmitted',  (files, fileList) => {
      this.uploader.upload();
      this.allFilUploader.upload();
    });
    // 上传完成事件
    this.uploader.on('complete',  () => {
      // Hide pause/resume when the upload has completed
      this.displayEle(this.allfileProgress.querySelectorAll('.progress-resume-link'), 'none');
      this.displayEle(this.allfileProgress.querySelectorAll('.progress-pause-link'), 'none');
    });

    this.uploader.on('fileComplete',  (rooFile, file) => {
      var $self = rooFile.$el;
      // Reflect that the file upload has completed
      file.uploadMessage = '(completed)';
      // 上传成功后隐藏按钮
      file.showFilePauseBtn = false;
      file.showFileResumeBtn = false;
    });
    // 上传文件失败
    this.uploader.on('fileError', (rootFile, file, message) => {
      file.uploadMessage = '(file could not be uploaded: ' + message + ')';
    });
    // 进度
    this.uploader.on('fileProgress', (rootFile, file) =>{
      // Handle progress for both the file and the overall upload
      rootFile.$el
        .find('.uploader-file-progress')
        .html(
          Math.floor(rootFile.progress() * 100) +
            '% ' +
            Uploader.utils.formatSize(rootFile.averageSpeed) +
            '/s ' +
            this.secondsToStr(rootFile.timeRemaining()) +
            ' remaining'
        );
      // $('.progress-bar').css({ width: Math.floor(this.uploader.progress() * 100) + '%' });
    });
    // 开始上传
    this.uploader.on('uploadStart',  () => {
      // Show pause, hide resume
      this.displayEle(this.allfileProgress.querySelectorAll('.progress-resume-link'), 'none');
      this.displayEle(this.allfileProgress.querySelectorAll('.progress-pause-link'), 'block');
    });
    // 异常
    this.uploader.on('catchAll', () => {
      console.log.apply(console, arguments);
    });
    // 上传组件中的所有列表
    this.allFilUploader = {
      pause: () => {
        this.uploader.pause();
        // Show resume, hide pause
        // 所有的文件的重试按钮显示 $('.uploader-file-resume').show();
        this.displayEle(this.uploaderList.querySelectorAll('.uploader-file-resume'), 'block');
        // 所有的文件暂停按钮隐藏 $('.uploader-file-pause').hide();
        this.displayEle(this.uploaderList.querySelectorAll('.uploader-file-pause'), 'none');
        // 整体控制的重试按钮显示 $('.uploader-progress .progress-resume-link').show();
        this.displayEle(this.allfileProgress.querySelectorAll('.progress-resume-link'), 'block');
        // 整体控制的暂停的按钮隐藏 $('.uploader-progress .progress-pause-link').hide();
        this.displayEle(this.allfileProgress.querySelectorAll('.progress-pause-link'), 'none');
      },
      cancel: () => {
        this.uploader.cancel();
        // 清空文件列表
        this.uploadQueue = [];
        this.uploaderList.style.display = 'none'
        this.allfileProgress.style.display = 'none';
      },
      upload: () => {
        // 所有的文件的暂停的按钮显示
        this.displayEle(this.uploaderList.querySelectorAll('.uploader-file-pause'), 'block');
        // 所有的文件的重试的按钮隐藏
        this.displayEle(this.uploaderList.querySelectorAll('.uploader-file-resume'), 'none');
        this.uploader.resume();
      },
      uploader: this.uploader
    };
  }
  // 暂停按钮
  filePauseHandler (file, index) {
    file.pause();
    // 文件对应的
    file.showFilePauseBtn = false;
    file.showFileResumeBtn = true;
    // this.uploadQueue.splice(index, 1, file as never);
    console.log('@@@@@',this.uploadQueue);
  }
  // 续传按钮
  fileResumeHandler (file) {
    file.resume();
    file.showFilePauseBtn = true;
    file.showFileResumeBtn = false;
    console.log(this.uploadQueue);
  }
  // 取消按钮
  fileCancelHandler (file) {
    file.cancel();
    // 文件list取消展示
    file.showUploadList = false;
    this.uploadQueue = this.uploadQueue.filter(item => item['id'] !== file.id && file.name !== item['name']) as [];
  }

  secondsToStr(temp) {
    function numberEnding(number) {
      return number > 1 ? 's' : '';
    }
    var years = Math.floor(temp / 31536000);
    if (years) {
      return years + ' year' + numberEnding(years);
    }
    var days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
      return days + ' day' + numberEnding(days);
    }
    var hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
      return hours + ' hour' + numberEnding(hours);
    }
    var minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
      return minutes + ' minute' + numberEnding(minutes);
    }
    var seconds = temp % 60;
    return seconds + ' second' + numberEnding(seconds);
  }

  displayEle(elementList, value){
    elementList.forEach(element => {
      element.style.display = value;
    });
  }
}
