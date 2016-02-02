<template>
    
    <div style="">

        <div class="row a-bouncein">

        	<div class="col-md-12">
	        	<div class="col-md-9">
	        		<div class="row">
		        		<div class="col-md-9">
							<div class="main-canvas">
								<canvas id="kakuCanvas"></canvas>
							</div>
		        		</div>
		        		<div class="col-md-3" style="padding-left:0px;padding-right:0px">
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
		        						
		        					</ul>
		        				</div>
		        				<div class="layer-opacity-slider">
		        					
		        				</div>
		        				<div class="layer-controls">
									<div class="zoom-button"><span class="glyphicon glyphicon-plus"></span></div>
									<div class="zoom-button"><span class="glyphicon glyphicon-minus"></span></div>
		        				</div>
		        			</div>
		        		</div>   			
	        		</div>
	        	</div>
	        	<div class="col-md-3" style="padding-left:0px;padding-right:0px">
	        		ddd
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
		border: rgb(240, 236, 230);
	}

	.main-canvas canvas{
		width: 100%;
		height: 500px;
	}

	.kaku-map {
		width: 100%;
		background: rgb(234, 234, 234);
		padding-left: 20px;
		padding-right: 20px;
		padding-top: 6px;
		padding-bottom: 2px;
		border: rgb(245, 245, 245);
		border-radius: 4px;
	}

	.kaku-map canvas {
		width: 100%;
		height: 140px;
	}

	.kaku-viewer {
		position: absolute;
		height: 50%;
		width: 70%;
		border: 1px solid rgb(0, 0, 0);
		top: 5px;
	}

	.zoom-control {
		margin-top: 5px;
		height: 23px;
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
		height: 120px;
	}

</style>
