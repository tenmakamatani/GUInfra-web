window.onbeforeunload = (ev) => {
  ev.preventDefault();
  ev.returnValue = "";
}
