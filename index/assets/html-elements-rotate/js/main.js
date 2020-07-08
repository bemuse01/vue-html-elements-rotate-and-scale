const radian = Math.PI / 180
let width = window.innerWidth, height = window.innerHeight

const method = {
    createPoints(){
        let arr = []
        let length = 20, dist = height * 0.25

        for(let i = 0; i < length; i++){
            let deg = Math.random() * 360
            let x = Math.cos(deg * radian) * dist, y = Math.sin(deg * radian) * dist 
            arr[i] = {
                id: i,
                deg: deg,
                velocity: Math.random(),
                tran: {
                    tsl: {x: x, y: y}
                },
                style: {
                    parent: {
                        transition: '0.3s',
                        transform: `translate(${x}px, ${y}px)`,
                    },
                    child: {
                        transition: '0.6s 0.15s',
                        transform: 'scale(1)',
                        opacity: '1'
                    }
                }
            }
        }
        return arr
    }
}

new Vue({
    el: '#wrap',
    data(){
        return{
            arr: method.createPoints(),
            height: window.innerHeight,
            sec: 0,
            play: true
        }
    },
    computed: {
        watchSec(){
            return this.sec
        }
    },
    watch: {
        watchSec(){
            if(this.sec % 30 === 0){
                this.play = false
                this.arr.forEach(e => {
                    e.style.parent.transition = '0.6s'
                    e.style.parent.transform = 'translate(0px, 0px)'
                    e.style.child.transform = 'scale(100)'
                    e.style.child.opacity = `${1 / this.arr.length * 2}`
                })
            }else if(this.sec === 15 || this.sec === 45){
                this.arr.forEach(e => {
                    e.style.parent.transition = '0.3s'
                    e.style.child.transform = 'scale(1)'
                    e.style.child.opacity = '1'
                })
                this.play = true
            }
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        init(){
            this.animate()

            window.addEventListener('resize', this.onWindowResize, false)
        },
        rotatePoints(){
            let dist = this.height * 0.25

            this.arr.forEach(e => {
                e.deg = (e.deg + e.velocity) % 360

                let x = Math.cos(e.deg * radian) * dist, y = Math.sin(e.deg * radian) * dist

                e.style.parent.transform = `translate(${x}px, ${y}px)`
            })
        },
        currentTime(){
            let date = new Date()
            this.sec = date.getSeconds()
        },
        onWindowResize(){
            this.height = window.innerHeight
        },
        render(){
            if(this.play) this.rotatePoints()
            this.currentTime()
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})