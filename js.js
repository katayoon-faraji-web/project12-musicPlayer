arr_library = []
let localStorageContent = []
let db = []

let turn = 0
let currnt_time = 0
let music_duration = 0
let portion = 0
let _shuffle = 1
let turn_vol = 1
let volume_perc = 0
let turn_play_pause = 0
let turn_music = ''


let _main = document.getElementById('main')
let home_btn = document.getElementById('home')
let search_btn = document.getElementById('search')
let searchbox = document.getElementById('searchbox')
let library_storing = document.getElementById('library_storing')
let show_library = document.getElementById('show_library')

// *****control section*****
let _line = document.querySelectorAll('.line')
let fill_line = document.getElementById('fill_line')
let _controlSection = document.getElementById('controlSection')
let _controlSection_img = document.querySelector('#controlSection img')
let singername = document.querySelectorAll('.namesinger')
let musicname = document.querySelectorAll('.namemusic')
let next_btn = document.getElementById('next')
let previous_btn = document.getElementById('previous')
let repeat_btn = document.getElementById('repeat')
let play_pause_btn = document.querySelectorAll('.play_pause')
let like_btn = document.querySelectorAll('.like')
let volume_range = document.getElementById('volume_range')
let download_btn = document.getElementById('download')
let shuffle_btn = document.getElementById('shuffle')
let playorpause_btn = document.querySelectorAll('.playorpause')
let vol_btn = document.getElementById('vol')
let add_to_library_btn = document.getElementById('add_to_library')


// *****playing page****
let playingpage = document.getElementById('playingpage')
let pic = document.getElementById('pic')
let fig = document.getElementById('fig')

// ****middle box****
let music_box_main = document.getElementById('music_box_main')
let all_musicboxs = document.querySelectorAll('.music_box')
let all_slides = document.querySelectorAll('swiper-slide')
let all_musics = document.querySelectorAll('.music_box audio')
let all_musics_in_slider1 = document.querySelectorAll('#slider1 audio')
let all_musics_in_slider2 = document.querySelectorAll('#slider2 audio')
let all_covers = document.querySelectorAll('.music_box img')
let all_singer_names = document.querySelectorAll('.singername')
let all_music_names = document.querySelectorAll('.musicname')
let all_music_play_symbol = document.querySelectorAll('.play_symbol')



all_musics.forEach((val)=>{
    val.setAttribute('data-like','off')

})
all_musicboxs.forEach((val)=>{
    val.style.borderRadius = '30px'

})


function _reset(){
    add_to_library_btn.style.color ='white'
    all_musics.forEach((val)=>{
        val.pause()
        fill_line.style.widows = 0
        turn_play_pause = 0
        play_pause_btn.forEach((val ,i)=>{
            if(i==0){

                val.innerHTML = `<i class="play bi bi-play-circle-fill text-[50px] text-[#1ed760] cursor-pointer hover:scale-110 transition-all duration-300 ">`
            }
            else{
                val.innerHTML = `<i class="play bi bi-play-circle-fill text-[30px] cursor-pointer hover:scale-110 transition-all duration-300 ">`
            }
        })
    })
}

function calculate_current_time(){
    setInterval(() => {
        music_duration = all_musics[turn_music].duration
        currnt_time = all_musics[turn_music].currentTime
        portion = (currnt_time/music_duration)
        fill_line.style.width = portion*(700) +'px'
        if(currnt_time == all_musics[turn_music].duration){
            turn_play_pause = 0
            fill_line.style.width = 0
            play_pause_btn.forEach((val ,i)=>{
                if(i==0){

                    val.innerHTML = `<i class="play bi bi-play-circle-fill text-[60px] text-[#1ed760] cursor-pointer hover:scale-110 transition-all duration-300 ">`
                }
                else{
                    val.innerHTML = `<i class="play bi bi-play-circle-fill text-[30px] cursor-pointer hover:scale-110 transition-all duration-300 ">`
                }
            })
        }
    }, 1000);
}

turn_music = 0
coordinating_names_pic()

function coordinating_names_pic(){
    _controlSection_img.src = all_covers[turn_music].src
    pic.src = all_covers[turn_music].src
    singername.forEach((val)=>{
        val.innerHTML = all_singer_names[turn_music].innerHTML
    })
    musicname.forEach((val)=>{
        val.innerHTML = all_music_names[turn_music].innerHTML
    })
}

function play_music(){
    if(turn_play_pause==0){
        all_musics[turn_music].play()
        play_pause_btn.forEach((val ,i)=>{
            if(i==0){

                val.innerHTML = `<i class="pause bi bi-pause-circle-fill text-[50px] text-[#1ed760] cursor-pointer hover:scale-110 transition-all duration-300 ">`
            }
            else{
                val.innerHTML = `<i class="pause bi bi-pause-circle-fill text-[30px] cursor-pointer hover:scale-110 transition-all duration-300 ">`
            }
        })
        calculate_current_time()
        turn_play_pause = 1
    }
    else{
        all_musics[turn_music].pause()
        play_pause_btn.forEach((val ,i)=>{
            if(i==0){

                val.innerHTML = `<i class="play bi bi-play-circle-fill text-[50px] text-[#1ed760] cursor-pointer hover:scale-110 transition-all duration-300 ">`
            }
            else{
                val.innerHTML = `<i class="play bi bi-play-circle-fill text-[30px] cursor-pointer hover:scale-110 transition-all duration-300 ">`
            }
        })
        turn_play_pause = 0
    }
}

repeat_btn.addEventListener('click',(e)=>{
    if( all_musics[turn_music].getAttribute('loop')==null){
        all_musics[turn_music].setAttribute('loop',true)
        e.target.style. color = '#1ed760'
    }
    else{
        all_musics[turn_music].removeAttribute('loop',true)
        e.target.style.color = 'white'
    }
})

like_btn.forEach((val)=>{
    val.addEventListener('click',()=>{
        if(all_musics[turn_music].getAttribute('data-like')=='off'){
            val.style.color = '#1ed760'
            all_musics[turn_music].setAttribute('data-like','on')
        }
        else{
            val.style.color = 'white'
            all_musics[turn_music].setAttribute('data-like','off')
        }
    })
})

download_btn.addEventListener('click',()=>{
    download_btn.parentElement.setAttribute('href',all_musics[turn_music].src)
    download_btn.parentElement.setAttribute('download')
    
})

shuffle_btn.addEventListener('click',(e)=>{
    let d = all_musics[turn_music].duration
    if(_shuffle==1){
        e.target.style.color ='green'
        setInterval(() => {
            
            if(currnt_time == all_musics[turn_music].duration){
                _reset()
                turn_music++
                all_slides[turn_music].click()
                
                play_music()
            }
        }, 1000);
        _shuffle = 0
    }
    else if(_shuffle==0){
        e.target.style.color ='white'
        _shuffle = 1
        // setInterval(() => {
            
        //     if(currnt_time == all_musics[turn_music].duration){
        //         _reset()
        //     }
        // }, 1000);
    }
})

next_btn.addEventListener('click',()=>{
    _reset()
    turn_play_pause = 0
    if(turn_music<=all_musics.length-2){
        turn_music++
    }
    else{
        turn_music = all_musics.length-1
    }
    coordinating_names_pic()
    play_music()

})

previous_btn.addEventListener('click',()=>{
    _reset()
    turn_play_pause = 0
    if(turn_music>=1){
        turn_music--
    }
    else{
        turn_music = 0
    }
    coordinating_names_pic()
    play_music()
})

all_slides.forEach((val ,i1)=>{
    val.addEventListener('click',(e)=>{
        _reset()
        turn_music = i1
        coordinating_names_pic()
        playingpage.style.display='flex'
        music_box_main.style.overflowY = 'hidden'
    })
})

all_slides.forEach((val ,i2)=>{
    val.addEventListener('mouseenter',(e)=>{
        all_music_play_symbol[i2].style.display ='flex'
    })
})

all_slides.forEach((val ,i2)=>{
    val.addEventListener('mouseleave',(e)=>{
        all_music_play_symbol[i2].style.display ='none'
    })
})

_line.forEach((val)=>{
    val.addEventListener('click',(e)=>{
        let x = e.offsetX
        fill_line.style.width = x +'px'
        all_musics[turn_music].currentTime = ((x*(all_musics[turn_music].duration))/700)
        all_musics[turn_music].play()
        turn_play_pause = 1
    })
})

home_btn.addEventListener('click',()=>{
    playingpage.style.display = 'none'
    music_box_main.style.overflowY = 'scroll'
})

search_btn.addEventListener('click',()=>{
    searchbox.focus()
    searchbox.style.border = '2px solid white'
})

volume_range.addEventListener('change', ()=>{
    volume_perc = volume_range.value
    if(volume_perc<=9){
        x=Number('0.'+volume_perc)
    }else{
        volume_perc=1
    }
    all_musics[turn_music].volume = volume_perc;
})

vol.addEventListener('click',()=>{
    if(turn_vol%2){
        volume_perc = 0
        vol.innerHTML = `<i class="bi bi-volume-mute text-[20px] text-white cursor-pointer hover:scale-110 transition-all duration-300"></i>`
    }else{
        volume_perc = .5
        vol.innerHTML = `<i  class="bi bi-volume-up-fill text-[20px] text-white cursor-pointer hover:scale-110 transition-all duration-300"></i>` 
    }
    all_musics[turn_music].volume = volume_perc;
    turn_vol++
})

// /slider/
const swiperEl = document.querySelectorAll('swiper-container');
const swiperslide = document.querySelectorAll('swiper-slide');
const swiper = swiperEl.swiper;
function check_slides_in_slider(){
    if(_main.clientWidth <=768){
        swiperEl.forEach((val)=>{
            val.setAttribute('slides-per-view','1')
        })
        swiperslide.forEach((val)=>{
            val.style.transform = 'translate(10px)'
        })
    }
    else if(_main.clientWidth <=1024){
        swiperEl.forEach((val)=>{
            val.setAttribute('slides-per-view','2')
        })
        swiperslide.forEach((val)=>{
            val.style.transform = 'translate(-150px)'
        })
    }
    else{
        swiperEl.forEach((val)=>{
            val.setAttribute('slides-per-view','5')
        })
        swiperslide.forEach((val)=>{
            val.style.transform = 'translate(-400px)'
        })
    }
}

// constructor
function obj_music(a,b,c,d){
    this.nameOfMusic=a;
    this.nameOfSinger=b;
    this.MusicPic=c;
    this.audiosource=d;
}

add_to_library_btn.addEventListener('click',(e)=>{
    let a = all_music_names[turn_music].innerHTML
    let b = all_singer_names[turn_music].innerHTML
    let c = all_covers[turn_music].src
    const o1 = new obj_music(a,b,c)
    get_from_localStorage()
    const r = db.some((val)=>{
        return  val.nameOfMusic==o1.nameOfMusic
    })
    if(r==false){
        db.push(o1)
        e.target.style.color = 'green'
    }
    else{
        e.target.style.color = 'white'
    }
    arr_library= []
    db.forEach((vall)=>{
        arr_library.push(vall)
    })
    set_to_local_storage()
    fill_library_contents()
})
let show_close_library_turn = 1
show_library.addEventListener('click',()=>{
    if(show_close_library_turn%2){
        get_from_localStorage()
        db.forEach((vall)=>{
            arr_library.push(vall)
        })
        fill_library_contents()
        library_storing.parentElement.style.minHeight = '80%'
       
    }
    else{
        library_storing.parentElement.style.minHeight = 0
    }
    show_close_library_turn++
    
})

function _remove_from_library(e) {
    e.target.parentElement.parentElement.remove()
    get_from_localStorage()
    for(ind in db){
        let childs = e.target.parentElement.previousElementSibling.children
        if(db[ind].nameOfMusic== childs[0].innerHTML){
            db.splice(ind,1)
            arr_library.splice(ind,1)
        }
    } 
    set_to_local_storage()
}


function set_to_local_storage(){
    localStorage.setItem('store',JSON.stringify(db))
}

function get_from_localStorage(){
    let c = localStorage.getItem('store')
    if(c!=null){
        localStorageContent =  JSON.parse((localStorage.getItem('store')))
        db = []
        localStorageContent.forEach((val)=>{
            db.push(val)
        })
    }
}

function playlist_func(e) {
    all_music_names.forEach((val , i)=>{
        if(val.innerHTML== e.target.innerHTML){
            all_slides[i].click()
        }
    })
}

function fill_library_contents(){
    while(library_storing.firstChild){
        library_storing.removeChild(library_storing.lastChild)
    }
    arr_library.forEach((val)=>{
        let _div = document.createElement('div')
        _div.innerHTML  = `<div  class="flex justify-center items-center h-[80px] px-2 w-full my-1">
                            <figure class="w-[70px] h-[70px] overflow-hidden shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]"><img  class="w-full h-full object-cover" src="${val.MusicPic}" alt=""></figure>
                            <div class="w-[180px] h-[60px] flex flex-wrap justify-start content-center lg:ml-2 ">
                                <span onclick='playlist_func(event)' class="namemusic w-full h-[40%] text-[15px] text-start cursor-pointer hidden lg:flex" >${val.nameOfMusic}</span>
                                <span class="namesinger w-full h-[40%] text-[12px] text-start  hidden lg:flex">${val.nameOfSinger}</span>
                            </div>
                            <div class="w-[40px] flex justify-center items-center h-full ">
                                <i onclick='_remove_from_library(event)' class="remove_from_library cursor-pointer bi bi-trash3-fill flex w-full justify-center text-[15px] "></i>
                            </div>
                            
                        </div>`
        
        library_storing.appendChild(_div)
    })
}

check_slides_in_slider()
setInterval(check_slides_in_slider, 1000);
window.addEventListener('resize',()=>{
    check_slides_in_slider()
})