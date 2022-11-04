type Options = {
  el?: string,
  width?: number,
  height?: number,
  color?: string
  fontSize?: number
}

class Palette {
  canvas: HTMLCanvasElement | null
  ctx
  press: boolean
  width: number
  height: number
  container: HTMLElement
  color: string
  fontSize: number
  constructor(options: Options = {}) {
    this.press = false;
    this.canvas = null;
    const { width, height, el, color, fontSize } = options;
    this.container = document.querySelector(el || 'body') || document.body;
    const containerWidth = this.container.clientWidth
    const containerHeight = this.container.clientHeight
    this.width = width || containerWidth;
    this.height = height || containerHeight;
    this.color = color || 'black';
    this.fontSize = fontSize || 5;
  }
  init() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");
    this.container.appendChild(this.canvas);
    const that = this;
    this.canvas.addEventListener("mousedown", function (e: MouseEvent) {
      that.mouseDown(e);
    });
    this.canvas.addEventListener("mousemove", function (e: MouseEvent) {
      that.mouseMove(e);
    });
    this.canvas.addEventListener("mouseup", function (e: MouseEvent) {
      that.mouseUp(e);
    });
  }
  getPen(x1: number, y1: number) {
    this.ctx.strokeStyle = this.color;
    // 设置线条的宽度
    this.ctx.lineWidth = this.fontSize;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
  }
  overPen(x1: number, y1: number) {
    this.ctx.closePath();
  }
  drawPen(x1: number, y1: number) {
    this.ctx.lineTo(x1, y1);
    this.ctx.stroke();
  }
  mouseDown(e: MouseEvent) {
    this.press = true;
    this.getPen(e.offsetX, e.offsetY);
  }
  mouseUp(e: MouseEvent) {
    this.press = false;
    this.overPen(e.offsetX, e.offsetY);
  }
  mouseMove(e: MouseEvent) {
    if (!this.press) {
      return;
    }
    this.drawPen(e.offsetX, e.offsetY);
  }
  clean() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  /**
   * 
   * @param filename 
   * @returns 
   */
  savePicture(filename: string) {
    const base64 = (this.canvas as HTMLCanvasElement).toDataURL("image/png", 1.0);
    const file = dataURLtoFile(base64, filename);
    return { base64, file };
  }
}


const dataURLtoFile = (dataUrl, filename = 'img') => {
  // 将base64转换为文件
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const suffix = mime.split("/")[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${filename}.${suffix}`, { type: mime });
}
export { Palette };
