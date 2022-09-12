function verificaBottom() {
  let scrollHeight = window.pageYOffset + window.innerHeight;
  let scrollPosition = document.documentElement.scrollHeight;

  if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
    console.log('TRUE')
    return true;
  } else {
    console.log('FALSE')
    return false;
  }
}

export default verificaBottom;
