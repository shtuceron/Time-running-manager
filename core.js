/*
 * Ограничение количества вызова функций.
 * runCountMax - количество вызовов функции за 1 секунду.
 */
function TimeRunningManager(runCountMax) {
	var $this = this;
	
	this.dateTime;
	this.deltaTime;
	this.functionList = [];
	this.runCountMax = runCountMax;
	
	this.checkById = function(id) {
		if (typeof $this.functionList[id] == 'undefined') {
			$this.functionList[id] = {
				runCount: 0,
				initialTime: (new Date()).getTime()
			};
		}
		else {
			$this.dateTime = (new Date()).getTime();
			$this.deltaTime = $this.dateTime - $this.functionList[id].initialTime;
			
			if ($this.deltaTime > 1000) {
				$this.functionList[id].runCount = 0;
				$this.functionList[id].initialTime = $this.dateTime;
			}
		}
		
		if ($this.functionList[id].runCount > $this.runCountMax)
			return false;
			
		$this.functionList[id].runCount++;
		
		return true;
	};
};

var timeRunningManager = new TimeRunningManager(5);

function longRunningFunction() {
	if (typeof arguments.callee.id == 'undefined')
		arguments.callee.id = timeRunningManager.functionList.length

	if (!timeRunningManager.checkById(arguments.callee.id))
		return;
		
	// Do something...
}