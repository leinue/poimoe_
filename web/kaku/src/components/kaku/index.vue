<template>
    
    <div style="margin-top:-21px;z-index:3000">

        <div class="row a-bounceinT">

        	<div class="col-md-12" style="padding:0px;border-top:1px solid rgb(217, 217, 217)">
        		<div class="col-md-3" style="padding-left:0px;padding-right:0px;border-bottom:1px solid rgb(217, 217, 217)">
	        		<div class="chatting-section">
	        			<div class="kaku-member">
                            <div class="room-photo"></div>                              
                            <div class="room-photo"></div>                              
                            <div class="room-photo"></div>                              
                            <div class="room-photo"></div>                              
                            <div class="room-photo"></div>
	        			</div>
	        		</div>
	        	</div>
	        	<div class="col-md-9" style="padding-left:0px;padding-right:0px">
	        		<div class="row" style="border-bottom: 1px solid #d8d8d8;">
		        		<div class="col-md-9" style="padding:0px;">
							<div class="main-canvas">
								<canvas id="kakuCanvas"></canvas>
							</div>
		        		</div>
		        		<div class="col-md-3" style="padding-left:0px;padding-right:0px;height:500px">
		        			<div class="zoom-well">
			        			<div class="kaku-map">
			        				<canvas></canvas>
			        				<div class="kaku-viewer"></div>
			        			</div>
								<div class="zoom-control">
									<div class="zoom-button"><span class="glyphicon glyphicon-zoom-in"></span></div>
									<div class="zoom-button"><span class="glyphicon glyphicon-resize-full"></span></div>
									<div class="zoom-button"><span class="glyphicon glyphicon-zoom-out"></span></div>
									<div class="zoom-button right">100%</div>
								</div>		        				
		        			</div>
		        			<div class="layer-well">
		        				<div class="layer-content">
		        					<ul class="layer-list">
		        						<li class="active">
		        							<input type="text" class="name-input">
		        							<span class="layer-name">layer name</span>
		        							<div class="eye-button">
		        								 <span class="glyphicon glyphicon-eye-open"></span>
		        							</div>
		        							<div class="opacity-rate">
		        								<span>100</span>
		        							</div>
		        						</li>
		        						<li>
		        							<input type="text" class="name-input">
		        							<span class="layer-name">layer name</span>
		        							<div class="eye-button">
		        								 <span class="glyphicon glyphicon-eye-open"></span>
		        							</div>
		        							<div class="opacity-rate">
		        								<span>100</span>
		        							</div>
		        						</li>
		        						<li>
		        							<input type="text" class="name-input">
		        							<span class="layer-name">layer name</span>
		        							<div class="eye-button">
		        								 <span class="glyphicon glyphicon-eye-open"></span>
		        							</div>
		        							<div class="opacity-rate">
		        								<span>100</span>
		        							</div>
		        						</li>
		        						<li>
		        							<input type="text" class="name-input">
		        							<span class="layer-name">layer name</span>
		        							<div class="eye-button">
		        								 <span class="glyphicon glyphicon-eye-open"></span>
		        							</div>
		        							<div class="opacity-rate">
		        								<span>100</span>
		        							</div>
		        						</li>
		        					</ul>
		        				</div>
		        				<div class="layer-opacity-slider">
		        					<div class="row">
		        						<div class="col-md-2" style="padding:0px;">
				        					<span class="label">透明度</span>
			        					</div>
			        					<div class="col-md-8">
				        					<input class="opacity-slider" type="range">		        						
			        					</div>
			        					<div class="col-md-2" style="padding:0px;">
			        						<span class="label">100%</span>
			        					</div>
		        					</div>
		        				</div>
		        				<div class="layer-controls">
									<div class="zoom-button"><span class="glyphicon glyphicon-plus"></span></div>
									<div class="zoom-button"><span class="glyphicon glyphicon-minus"></span></div>
		        				</div>
		        			</div>
		        		</div>   			
	        		</div>
	        		<div class="row">
	        			<div class="col-md-4">
			        		<div class="master-controls">
			        			<div class="button-container">
			        				<a class="tool-button"><span class="glyphicon glyphicon-erase"></span></a>
			        				<a class="tool-button"><span class="glyphicon glyphicon-pushpin"></span></a>
			        				<a class="tool-button active"><span class="glyphicon glyphicon-pencil"></span></a>
			        				<a class="tool-button"><span class="glyphicon glyphicon-share-alt"></span></a>
			        				<a class="tool-button reverse"><span class="glyphicon glyphicon-share-alt"></span></a>
			        			</div>
			        		</div>	        				
	        			</div>
	        			<div class="col-md-4">
	        				
	        			</div>
	        			<div class="col-md-4">
	        				<div class="button-container" style="margin-top:7px;">
	    						<div class="row">
	        						<div class="col-md-2" style="padding:0px;text-align:center">
			        					<span class="label">透明度</span>
		        					</div>
		        					<div class="col-md-8">
			        					<input class="opacity-slider" type="range">		        						
		        					</div>
		        					<div class="col-md-2" style="padding:0px;">
		        						<span class="label">100%</span>
		        					</div>
	        					</div>
	        					<div class="row">
	        						<div class="col-md-2" style="padding:0px;text-align:center">
			        					<span class="label">大小</span>
		        					</div>
		        					<div class="col-md-8">
			        					<input class="opacity-slider" type="range">		        						
		        					</div>
		        					<div class="col-md-2" style="padding:0px;">
		        						<span class="label">100%</span>
		        					</div>
	        					</div>
	        					<div class="row">
	        						<div class="col-md-2" style="padding:0px;text-align:center;text-align:center">
			        					<span class="label">阴影</span>
		        					</div>
		        					<div class="col-md-8">
			        					<input class="opacity-slider" type="range">		        						
		        					</div>
		        					<div class="col-md-2" style="padding:0px;">
		        						<span class="label">100%</span>
		        					</div>
	        					</div>
	        				</div>
	        			</div>
	        		</div>
	        	</div>
	        </div>

        </div>
    </div>

</template>

<script>
	
</script>

<style>

	canvas {
		background: rgb(255, 255, 255);		
	}

	.main-canvas {
		width: 100%;
		border: 1px solid rgb(216, 216, 216);
		border-top: none;
		border-bottom: none;
		height: 74vh;
		overflow: scroll;
	}

	.main-canvas canvas{
		width: 100%;
		height: 100%;
	}

	.kaku-map {
		width: 100%;
		/*background: rgb(234, 234, 234);*/
		padding-left: 20px;
		padding-right: 20px;
		padding-top: 6px;
		padding-bottom: 2px;
		border-bottom: 1px solid #d8d8d8;
		border-radius: 2px;
	}

	.kaku-map canvas {
		width: 100%;
		height: 140px;
	}

	.kaku-viewer {
		position: absolute;
		width: 70%;
		border: 1px solid rgb(0, 0, 0);
		top: 10px;
		height: 10%;
	}

	.zoom-control {
		margin-top: 5px;
		height: 23px;
		margin-bottom: 5px;
	}

	.zoom-control .zoom-button, .layer-controls .zoom-button{
		width: 23px;
		height: 23px;
		margin: 0 5px 0 0;
		border-radius: 4px;
		cursor: pointer;
		float: left;
		text-align: center;
		transition: all 0.4s ease-in-out;
		font-size: 11px;
	}

	.zoom-control .zoom-button span, .layer-controls .zoom-button span {
		height: 23px;
		width: 23px;
		line-height: 23px;
		border-radius: 4px;
		transition: all 0.3s ease;
		color: #7f7f7f;
	}

	.zoom-control .zoom-button span:hover, .layer-controls .zoom-button span:hover {
		background: rgb(222, 222, 222);
	}

	.zoom-control .zoom-button.right{
		width: 30px;
		height: 23px;
		font-size: 9px;
		line-height: 21px;
		color: #7f7f7f;
		float: right;
		text-align: right;
	}

	.layer-well {
		width: 100%;
		height: calc(100% - 164px);
		height: -moz-calc(100% - 164px);
	}

	.layer-content, .chatting-section {
		/*background: rgb(234, 234, 234);*/
		border-radius: 2px;
		padding: 5px;
		height: 100%;
	}

	.layer-list {
		margin-bottom: 0px;
		overflow-x: hidden;
		overflow-y: auto;
		color: #000;
		text-align: left;
		padding: 0;
		list-style: none;
	}

	.layer-list li {
		width: 100%;
		padding: 4px;
		color: rgb(0, 0, 0);
		cursor: default;
		font-size: 11px;
		line-height: 22px;
		overflow: hidden;
		text-align: left;
		border-bottom: 1px solid #d8d8d8;
		color: #000;
	}

	.layer-list li input {
		display: none;
	}

	.layer-list li.edit-status input{
		display: block;
	}

	.layer-list li.edit-status .layer-name {
		display: none;
	}

	.layer-list li.active {
		background: rgb(255, 255, 255);
	}

	.layer-list li.active .layer-name {
		font-weight: bold;
		font-style: italic;
		color: #808080;
	}

	.layer-list li.active span{
		color: rgb(0, 0, 0);
	}

	.layer-list li .layer-name {
		color: #7f7f7f;
	}

	.eye-button {
		position: absolute;
		right: 10px;
		font-size: 12px;
		margin-top: -20px;
		cursor: pointer;
	}

	.eye-button span, .opacity-rate span {
		color: #7f7f7f;
	}

	.opacity-rate {
		position: absolute;
		right: 32px;
		margin-top: -21px;
	}

	.name-input {
		border-top: 0px;
		border-left: 0px;
		border-right: 0px;
		border-bottom: 1px solid #d8d8d8;
	}

	.opacity-slider {
		height: 10px;
		margin-top: 7px;
		box-shadow: none;
		background: rgb(170, 170, 170);
	}

</style>
