const lockers = Array.from(document.getElementsByClassName("locker"));
const overlay = document.getElementById('overlay');
const zoomedImg = document.getElementById('zoomedImg');
console.log("yoooo");
console.log("all locekrs", lockers[0]);

console.log(Array.isArray(lockers));
lockers.forEach((locker, ind) => {
    locker.addEventListener('click', () => {
    //   zoomedImg.src = locker.src;
    //   zoomedImg.alt = locker.alt;
    //   overlay.classList.remove('hidden');
    alert("clicked!! " + (ind + 1))
    });
  });

  