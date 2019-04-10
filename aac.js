let muted = false;

const speak = message => {
  if ( !muted ) {
    const m = new SpeechSynthesisUtterance( message );
    window.speechSynthesis.speak( m );
  }
  $( '#display' ).text( message );
}

const showSection = section => {
  $( '.section' ).removeClass( 'active' );
  $( '#' + section ).addClass( 'active' );

  $( '.nav-button' ).removeClass( 'active' );
  $( '#' + section + '-toggle' ).addClass( 'active' );
}

$( document ).ready( () => {
  $( '.speak' ).click( e => speak( $( e.target ).closest( '.speak' )[0].innerText ) );

  $( '#seating-toggle' ).click( e => showSection( 'seating' ) );
  $( '#drinks-toggle' ).click( e => showSection( 'drinks' ) );
  $( '#food-toggle' ).click( e => showSection( 'food' ) );
  $( '#miscellaneous-toggle' ).click( e => showSection( 'miscellaneous' ) );
  $( '#about-toggle' ).click( e => showSection( 'about' ) );

  $( '#seats' ).click( e => speak( `Can we get a table with ${ $( 'input[name=num-seats]' ).val() } seats?` ) );

  $( '.drink-size' ).click( e => {
    $( '.drink-size' ).removeClass( 'active' );
    $( e.target ).closest( '.drink-size' ).addClass( 'active' );
  } );

  $( '.drink-temp' ).click( e => {
    $( '.drink-temp' ).removeClass( 'active' );
    $( e.target ).closest( '.drink-temp' ).addClass( 'active' );
  } );

  $( '.drink-name' ).click( e => {
    const target = $( e.target ).closest( '.drink-name' )

    const size = $( '.drink-size.active' ).val() ? $( '.drink-size.active' ).val() : '';
    const temp = $( '.drink-temp.active' ).val() ? $( '.drink-temp.active' ).val() : '';
    const name = $( target ).val();
      
    speak( `I\'ll have a ${size} ${temp} ${name}.` );
    
    $( '.drink-size.active' ).removeClass( 'active' );
    $( '.drink-temp.active' ).removeClass( 'active' );
  } );

  $( '.free' ).click( e => {
    const target = $( e.target ).closest( '.free' )
    speak( `Is this item ${target.val()}?` );
  } );

  $( '.return' ).click( e => {
    const target = $( e.target ).closest( '.return' )
    speak( `This food is ${target.val()}. I'm sorry but I can't eat it. Please take it back.` );
  } );


  $( '#toggle-audio' ).click( e => {
    muted = !muted;
    $( '#toggle-audio i' ).toggleClass( 'fa-volume-up', !muted );
    $( '#toggle-audio i' ).toggleClass( 'fa-volume-mute', muted );
  } )
} );