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
      $txtDisplay.value += this.value;
      unlockedButtons();

      //Active Button Equal
      if (activeResult) {
        $txtDisplay.value = this.value;
        activeResult = false;
      }
    });
  });

  d.addEventListener("click", (e) => {
    if (e.target === $btnSum || e.target === $btnMinus || e.target === $btnProduct || e.target === $btnDivide) {
      arithmeticOptions(e);
    }

    if (e.target === $btnReset) {
      $txtDisplay.value = "";
    }

    if (e.target === $btnDelete) {
      $txtDisplay.value = $txtDisplay.value.slice(0, -1);
    }

    if (e.target === $btnDot) {
      $txtDisplay.value += e.target.value;
      $btnDot.disabled = true;
    }

    if (e.target === $btnResult) {
      let captureSigns = /[+|x|/|.|-]/g;
      if (captureSigns.test($txtDisplay.value.slice(-1))) {
        return alert("Error en la operación, debes digitar correctamente tus valores");
      }
      if ($txtDisplay.value === "") {
        return alert("Primero debes ingresar valores");
      }
      let convertproduct = $txtDisplay.value.replace("x", "*");
      $txtDisplay.value = eval(convertproduct);
      activeResult = true;
      $btnResult.disabled = true;
    }
  });

  //Function Arithmetic , click signs
  const arithmeticOptions = (e) => {
    if ($txtDisplay.value === "") return alert("Primero debes digitar un numero");
    if ($txtDisplay.value.slice(-1) === ".") return alert("Debes digitar correctamente tu numero decimal");
    $txtDisplay.value += e.target.value;
    $btnDot.disabled = false;
    lockedButtons();
    $btnResult.disabled = false;
    activeResult = false;
  };

  //Locked Buttons Operations
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
}
