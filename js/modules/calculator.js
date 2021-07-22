const d = document;

export default function calculatorApp() {
  const $btnNumbers = d.querySelectorAll("[data-calc-number]");
  const $txtDisplay = d.getElementById("txtDisplay");
  const $btnSum = d.getElementById("btnSum"),
    $btnMinus = d.getElementById("btnMinus"),
    $btnProduct = d.getElementById("btnProduct"),
    $btnDivide = d.getElementById("btnDivide"),
    $btnDot = d.getElementById("btnDot");
  const $btnDelete = d.getElementById("btnDelete"),
    $btnReset = d.getElementById("btnReset"),
    $btnResult = d.getElementById("btnResult");

  //Initial Values for default
  $btnResult.disabled = true;
  let activeResult = false;

  $btnNumbers.forEach((number) => {
    number.addEventListener("click", function (e) {
      $txtDisplay.value += this.textContent;
      unlockedButtons();
      fontSizeLength();
      if (activeResult) {
        $txtDisplay.value = this.textContent;
        activeResult = false;
        $btnDot.disabled = false;
      }
    });
  });

  d.addEventListener("click", (e) => {
    if (e.target === $btnSum || e.target === $btnProduct || e.target === $btnDivide) {
      if ($txtDisplay.value === "") return alert("Primero debes digitar un numero");
      arithmeticOptions(e);
    }

    if (e.target === $btnProduct || e.target === $btnDivide) {
      $btnMinus.disabled = false;
    }

    if (e.target === $btnMinus) {
      arithmeticOptions(e);
    }

    if (e.target === $btnReset) {
      $txtDisplay.value = "";
      $btnDot.disabled = false;
    }

    if (e.target === $btnDelete) {
      fontSizeLength();

      if ($txtDisplay.value.length > 0) {
        let captureSigns = /[+|x|/|-]/g;
        //Validity for control dot , disabled and enabled.
        if (!captureSigns.test($txtDisplay.value.slice(-1))) {
          lockedButtons();
        } else {
          unlockedButtons();
        }

        //Capture Display , deleted last character
        $txtDisplay.value = $txtDisplay.value.slice(0, -1);

        ///Validity for enabled button - , accept operations negatives
        if ($txtDisplay.value.slice(-1) === "x" || $txtDisplay.value.slice(-1) === "/") {
          $btnMinus.disabled = false;
        }

        //Clear Display or not , depends on the point
        if (!captureSigns.test($txtDisplay.value.slice(-1))) {
          $txtDisplay.value.split(captureSigns).map((value) => {
            if (!value.includes(".")) {
              $btnDot.disabled = false;
            } else {
              activeResult = false;
              $btnDot.disabled = true;
            }
          });
        }
      }
    }

    if (e.target === $btnDot) {
      fontSizeLength();
      $txtDisplay.value += e.target.textContent;
      $btnDot.disabled = true;
      if (activeResult) activeResult = false;
    }

    if (e.target === $btnResult) {
      const captureSigns = /[+|x|/|.|-]/g;

      if (captureSigns.test($txtDisplay.value.slice(-1))) {
        return alert("Error en la operación, debes digitar correctamente tus valores");
      }
      if ($txtDisplay.value === "") {
        return alert("Primero debes ingresar valores");
      }

      let convertproduct = processOperation($txtDisplay.value);
      console.log(convertproduct);
      $txtDisplay.value = Number.isInteger(eval(convertproduct)) ? eval(convertproduct) : eval(convertproduct).toFixed(2);
      $btnResult.disabled = true;
      activeResult = true;
      if ($txtDisplay.value.includes(".")) {
        $btnDot.disabled = true;
      } else {
        $btnDot.disabled = false;
      }
    }
  });

  //Function Arithmetic , click signs
  const arithmeticOptions = (e) => {
    if ($txtDisplay.value.slice(-1) === ".") {
      activeResult = false;
      return alert("Debes digitar correctamente tu numero decimal");
    }
    $txtDisplay.value += e.target.textContent;
    lockedButtons();
    fontSizeLength();
    $btnResult.disabled = false;
    activeResult = false;
    $btnDot.disabled = false;
  };

  //Locked Buttons Operations - x
  const lockedButtons = () => {
    $btnSum.disabled = true;
    $btnMinus.disabled = true;
    $btnProduct.disabled = true;
    $btnDivide.disabled = true;
  };

  //UnLocked Buttons Operations
  const unlockedButtons = () => {
    $btnSum.disabled = false;
    $btnMinus.disabled = false;
    $btnProduct.disabled = false;
    $btnDivide.disabled = false;
  };

  //Function validity Octal
  const processOperation = (operation) => {
    let captureSigns = /[+|x|/|-]/g;
    let captureMinus, response;
    let resultContent = "";

    //Validity Minus in operation
    if (operation.charAt(0) === "-") {
      captureMinus = operation.substr(1, operation.length);
      response = captureMinus.split(captureSigns).map((value) => parseFloat(value));
    } else {
      response = operation.split(captureSigns).map((value) => parseFloat(value));
    }

    let signs = [];
    for (let sign of operation) {
      if (sign.match(captureSigns)) signs.push(sign);
    }

    //Mapped Signs , Convert x en "*"
    const signsMapped = signs.map((s) => s.replaceAll("x", "*"));
    if (response.length === signsMapped.length) {
      for (let i = 0; i < response.length; i++) {
        if (signs.length > i) resultContent += signsMapped[i] + response[i];
      }
    } else {
      for (let i = 0; i < response.length; i++) {
        if (signs.length > i) resultContent += response[i] + signsMapped[i];
      }
      resultContent += response[response.length - 1];
    }
    return resultContent.replaceAll("NaN", "");
  };

  //Minimize fontSize
  const fontSizeLength = () => {
    const length = (length) => {
      $txtDisplay.value.length > length ? ($txtDisplay.style.fontSize = "1.1rem") : ($txtDisplay.style.fontSize = "2rem");
    };
    matchMedia("(min-width: 648px)").matches ? length(18) : length(10);
  };

  d.addEventListener("change", fontSizeLength);
}
