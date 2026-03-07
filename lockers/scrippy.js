const lockers = Array.from(document.getElementsByClassName("locker"));
const overlay = document.getElementById('overlay');
const zoomedLocker = document.getElementById('zoomedLocker');
console.log("yoooo");
console.log("all lockers", lockers[0]);

console.log(Array.isArray(lockers));
lockers.forEach((locker, ind) => {
    locker.addEventListener('click', (event) => {
      if (overlay.classList.contains('hidden')){
        event.stopPropagation()
        zoomedLocker.src = locker.src;
        overlay.classList.remove('hidden');
        console.log("clicked!! " + (ind + 1))
      }
    });
});

// when click outside of overlay, exit
document.addEventListener('click', (event) => {
  console.log("class lst" ,overlay.classList)
  if(!overlay.contains(event.target) && !overlay.classList.contains('hidden')){
    console.log("clicked outside");
    overlay.classList.add('hidden');
    console.log("overlay list", overlay.classList)
  }
})

  