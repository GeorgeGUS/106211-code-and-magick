function getMessage(a, b) {
  "use strict";
  var i = 0,
    result = 0,
    distancePath = 0,
    numberOfSteps = 0;

  if (typeof a === "boolean") {
    result = a ? "Я попал в " + b : "Я никуда не попал";
  } else if (typeof a === "number") {
    result = "Я прыгнул на " + a * 100 + " сантиметров";
  } else if (Array.isArray(a)) {
    if (Array.isArray(b)) {
      for (i; i < a.length; i++) {
        distancePath += a[i] * b[i];
      }
      result = "Я прошёл " + distancePath + " метров";
    } else {
      for (i; i < a.length; i++) {
        numberOfSteps += a[i];
      }
      result = "Я прошёл " + numberOfSteps + " шагов";
    }
  } else {
    result = "Переданы некорректные данные";
  }
  return result;
} 