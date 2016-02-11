
var ColorPicker = function(options) {
    "use strict";

    var component = this,
        defaultColor = options.defaultColor || 'rgb(0,0,255)',
        panel = null,
        pickerCanvas = null,
        sliderCanvas = null,
        pickerContext = null,
        sliderContext = null,
        swatch = null,
        opacityValue = null,
        pickerMouseDown = false,
        sliderMouseDown = false;

    var createComponent = function() {

        panel = document.createElement( 'div' );
        swatch = document.createElement( 'div' );
        pickerCanvas = document.createElement( 'canvas' );
        sliderCanvas = document.createElement( 'canvas' );

        pickerContext = pickerCanvas.getContext( '2d' );
        sliderContext = sliderCanvas.getContext( '2d' );


        panel.className = 'color-picker-panel';
        swatch.className = 'swatch';
        pickerCanvas.className = 'pickerCanvas';
        sliderCanvas.className = 'sliderCanvas';

        pickerCanvas.style.width = '200px';
        pickerCanvas.style.height = '150px';

        sliderCanvas.style.width = '25px';
        sliderCanvas.style.height = '150px';

        panel.appendChild( swatch );
       // panel.appendChild( createOpacitySlider() );
        panel.appendChild( pickerCanvas );
        panel.appendChild( sliderCanvas );

        component.createGradient( [0, 0, 255] );
        component.createSlider();

    };

    var createOpacitySlider = function() {
        var fragment = document.createDocumentFragment(),
            input = document.createElement( 'input' );

        opacityValue = document.createElement( 'output' );

        input.className = 'opacitySlider';
        input.type = 'range';
        input.min = 0;
        input.max = 100;
        input.step = 5;
        input.value = 100;

        opacityValue.value = input.value;

        input.oninput = function() {
            component.updateOpacityValue( input.value )
        };

        input.onchange = function() {
            component.updateOpacityValue( input.value )
        };

        fragment.appendChild( input );
        fragment.appendChild( opacityValue );


        return fragment;

    };

    this.createGradient = function( color ) {

        var context = pickerCanvas.getContext( '2d' ),
            grd = context.createLinearGradient( pickerCanvas.width, 0, pickerCanvas.width, pickerCanvas.height ),
            grd2 = context.createLinearGradient( 0, 8, pickerCanvas.width, pickerCanvas.height );

        context.rect( 0, 0, pickerCanvas.width, pickerCanvas.height );
        context.fillStyle = 'rgb(' + color + ')';

        context.fill();

        context.rect( 0, 0, pickerCanvas.width, pickerCanvas.height );
        context.rect( 0, 0, pickerCanvas.width, pickerCanvas.height );

        grd2.addColorStop( 0, "#fff" );
        grd2.addColorStop( .5, "rgba(255,255,255,.09)" );
        grd2.addColorStop( 1, "transparent" );

        context.fillStyle = grd2;
        context.fill();

        // add linear gradient
        grd.addColorStop( 0, "transparent" );
        grd.addColorStop( .2, "transparent" );
        grd.addColorStop( .3, 'rgba(0,0,0,.01)' );
        grd.addColorStop( 1, 'rgb(0,0,0)' );

        context.fillStyle = grd;
        context.fill();


        pickerCanvas.addEventListener( 'mousedown', function() {

            pickerMouseDown = true;
            var mousePos = component.getMousePosition( pickerCanvas, event ),
                data = pickerContext.getImageData( mousePos.x, mousePos.y, 1, 1 ).data,
                color = 'rgb('+ [data[0], data[1], data[2]] +')';

            component.setThumbnailSwatchColor( color );

        }, false );

        pickerCanvas.addEventListener( 'mouseup', function() {
            pickerMouseDown = false;

        } );

        pickerCanvas.addEventListener( 'mousemove', function( event ) {
            if ( pickerMouseDown ) {
                var mousePos = component.getMousePosition( pickerCanvas, event ),
                    data = pickerContext.getImageData( mousePos.x, mousePos.y, 1, 1 ).data,
                    color = 'rgb('+ [data[0], data[1], data[2]] +')';

                component.setThumbnailSwatchColor( color );
            }


        } );

    };

    this.createSlider = function() {

        var context = sliderCanvas.getContext( '2d' ),
            grd = context.createLinearGradient( 0, 0, 0, sliderCanvas.height );

        context.rect( 0, 0, sliderCanvas.width, sliderCanvas.height );

        grd.addColorStop( 0, "#FF0000" );
        grd.addColorStop( .13, '#FF00FF' );
        grd.addColorStop( .25, '#8000FF' );
        grd.addColorStop( .38, '#0040FF' );
        grd.addColorStop( .50, '#00FFFF' );
        grd.addColorStop( .63, '#00FF40' );
        grd.addColorStop( .75, '#0BED00' );
        grd.addColorStop( .88, '#FFFF00' );
        grd.addColorStop( 1, '#FF0000' );

        context.fillStyle = grd;
        context.fill();

        sliderCanvas.addEventListener( 'mousedown', function( event ) {
            sliderMouseDown = true;
            var mousePos = component.getMousePosition( sliderCanvas, event ),
                data = context.getImageData( mousePos.x, mousePos.y, 1, 1 ).data,
                color = [data[0], data[1], data[2]];

            component.createGradient( color );
        }, false );

        sliderCanvas.addEventListener( 'mouseup', function() {
            sliderMouseDown = false;
        } );

        sliderCanvas.addEventListener( 'mousemove', function( event ) {

            if ( sliderMouseDown ) {
                var mousePos = component.getMousePosition( sliderCanvas, event ),
                    data = context.getImageData( mousePos.x, mousePos.y, 1, 1 ).data,
                    color = [data[0], data[1], data[2]];

                component.createGradient( color );
            }
        } );
    };

    this.getMousePosition = function( canvas, event ) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left ,
            y: event.clientY - rect.top
        };
    };


    this.updateOpacityValue = function( value ) {
        opacityValue.value = value;
    };

    this.setThumbnailSwatchColor = function( color ) {
        swatch.style.backgroundColor = color;
        sessionStorage.swatchColor = color;
        options.onColorChange(color);
    };

    this.getPanel = function() {
        return panel;
    };


    createComponent();

    component.setThumbnailSwatchColor( defaultColor );
};

module.exports = {
    init: function(options) {
        return new ColorPicker(options);
    }
};
