function typeWriter(text, n, typewriterDivSelector) {
    // console.log("typing...")
  if (n < (text.length)) {
    $(typewriterDivSelector).html(text.substring(0, n+1));
    n++;
    setTimeout(function() {
      typeWriter(text, n, typewriterDivSelector)
  }, 30);
  }
}
