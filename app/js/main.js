for (let year = 1980; year <= 2003; year++) {
    
  let inputs = document.createElement("input");
  let labels = document.createElement("label");

  document.getElementById("year").appendChild(inputs).innerHTML = '';
  inputs.id = 'singleSelect'+year;
  inputs.classList.add('__select__input');
  inputs.setAttribute('type', 'radio');
  inputs.setAttribute('name', 'singleSelect');

  document.getElementById("year").appendChild(labels).innerHTML = year;
  labels.setAttribute('for', 'singleSelect'+year);
  labels.classList.add('__select__label');

}

const selectSingle = document.querySelector('.__select');
const selectSingle_title = selectSingle.querySelector('.__select__title');
const selectSingle_labels = selectSingle.querySelectorAll('.__select__label');
const selectContent = document.querySelector('.__select__content');

// Toggle menu
selectSingle_title.addEventListener('click', () => {
  if ('active' === selectSingle.getAttribute('data-state')) {
    selectSingle.setAttribute('data-state', '');
    selectContent.setAttribute('class', '__select__content deactivate');
  } else {
    selectSingle.setAttribute('data-state', 'active');
    selectContent.classList.add("activate");
    selectContent.classList.remove("deactivate");
    selectSingle_title.classList.add("single-font");
  }
});

// Close when click to option
for (let i = 0; i < selectSingle_labels.length; i++) {
  selectSingle_labels[i].addEventListener('click', (evt) => {
    selectSingle_title.textContent = evt.target.textContent;
    selectSingle.setAttribute('data-state', '');
    selectContent.classList.remove("activate");
  selectContent.classList.add("deactivate");
  selectSingle_title.classList.add("single-font");
  });
}

window.addEventListener('click', function(e){
  selectContent.classList.remove("activate");
  selectContent.classList.add("deactivate");
});
selectSingle.addEventListener('click', function(e){
  e.stopPropagation();
});


var levels = document.querySelector('.levels')
var progress = document.querySelector('.progress')
var knob = document.querySelector('.knob')

var levelsBox, knobBox, points, min, max

knob.addEventListener('mousedown', function(e) {
  e.preventDefault()

  window.addEventListener('mousemove', dragging)
  window.addEventListener('mouseup', drop)

  knob.style.transition = '0s'
  progress.style.transition = '0s'

  var knobBox = knob.getBoundingClientRect()
  // координата нажатия мыши относительно ручки
  var shift = e.x - knobBox.left;

  function dragging(e) {
    var x = 0

    // не даем выйти за границы
    if (e.x < min) x = min
    else if (e.x > max) x = max
    else x = e.x

    X = x - shift - levelsBox.left
    knob.style.transform = `translateX(${X}px) rotate(-45deg)`
    progress.style.width = X + knobBox.width / 2 + 'px'
  }

  function drop(e) {
    // ближайшее число в массиве точек к текущей координате ручки
    var closest = getClosest(X)

    knob.style.transition = '0.5s'
    progress.style.transition = '0.5s'

    // перемащаем к полученной ближайшей точке
    knob.style.transform = `
    	translateX(${closest - knobBox.width / 2.7}px)
    	rotate(-45deg)
     `
    progress.style.width = closest + 'px'

    window.removeEventListener('mousemove', dragging)
    window.removeEventListener('mousemove', drop)
  }
})

function getClosest(v) {
  return points.reduce((prev, curr) =>
    (Math.abs(curr - v) < Math.abs(prev - v) ? curr : prev)
  )
}

function init() {
  levelsBox = levels.getBoundingClientRect()
  knobBox = knob.getBoundingClientRect()

  /* ширина промежутков */
  points = [
    0,
    levelsBox.width * 0.25,
    levelsBox.width * 0.45,
    levelsBox.width
  ]

  min = levelsBox.left,
    max = levelsBox.right,

    // тут я поленился и при изменении размера окна просто обнуляются размеры
    knob.style.transform = `translateX(-${knobBox.width / 2.7}px) rotate(-45deg)`
  progress.style.width = 0
}

// при изменении ширины окна пересчитываем
// некоторые размеры для корректного отображения
window.onresize = init

init()

