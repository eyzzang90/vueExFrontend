<script>
    const percentWidthToPix = (percent, ctx) => Math.floor((ctx.canvas.width / 100) * percent);
    const percentHeightToPix = (percent, ctx) => Math.floor((ctx.canvas.height / 100) * percent);

    export default {

      abstract: true,
      name: "MyBox",
      inject: ['provider'],

      props: {
        x1: {
          type: Number,
          default: 0
        },
        y1: {
          type: Number,
          default: 0
        },
        x2: {
          type: Number,
          default: 0
        },
        y2: {
          type: Number,
          default: 0
        },
        value: {
          type: Number,
          default: 0
        },
        color: {
          type: String,
          default: '#ff0000'
        }
      },

      data() {
        return {
          oldBox: {
            x: null,
            y: null,
            w: null,
            h: null
          }
        }
      },

      computed: {
        calculatedBox() {
          // console.log('calculatedBox');

          const ctx = this.provider.context;

          const calculated = {
            x: percentWidthToPix(this.x1, ctx),
            y: percentHeightToPix(this.y1, ctx),
            w: percentWidthToPix(this.x2 - this.x1, ctx),
            h: percentHeightToPix(this.y2 - this.y1, ctx),
          }
          this.oldBox = calculated
          return calculated;
        }
      },

      render() {
        // console.log('mybox')
        // Since the parent canvas has to mount first, it's *possible* that the context may not be
        // injected by the time this render function runs the first time.
        if(!this.provider.context) return;
        const ctx = this.provider.context;

        // Keep a reference to the box used in the previous render call.
        const oldBox = this.oldBox
        // Calculate the new box. (Computed properties update on-demand.)
        const newBox = this.calculatedBox

        ctx.beginPath();
        // Clear the old area from the previous render.
        ctx.clearRect(oldBox.x, oldBox.y, oldBox.w, oldBox.h);
        // Clear the area for the text.
        ctx.clearRect(newBox.x, newBox.y - 42, newBox.w, 100);

        // Draw the new rectangle.
        ctx.rect(newBox.x, newBox.y, newBox.w, newBox.h);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Draw the text
        ctx.fillStyle = '#000'
        ctx.font = '28px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(Math.floor(this.value), (newBox.x + (newBox.w / 2)), newBox.y - 14)
      }
    }
</script>
