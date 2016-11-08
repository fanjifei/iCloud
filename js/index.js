
var todo=[
  {
  	id:1,
  	title:'新列表1',
  	color:'#FF286C',
  	list:[
     {
     	title:'自治州自治州',
     	done:'true'
     },
     {
     	title:'才踩踩踩踩踩踩从',
     	done:'true'
     },
     {
     	title:'爸爸八佰伴',
     	done:'false'
     },
     {
     	title:'啛啛喳喳尺寸',
     	done:'false'
     }
  	]
   },
    {
  	id:2,
  	title:'新列表2',
  	color:'#CC74E1',
  	list:[
     {
     	title:'哈顶顶顶顶',
     	done:'true'
     },
     {
     	title:'刚刚灌灌灌灌灌',
     	done:'false'
     },
     {
     	title:'急急急急急急',
     	done:'false'
     }
  	]
   }
]
var colors=['#FF286C','#CC74E1','#65D839','#1CAFF8','#F7C900','#9E7F5A','#FF8400']
var app=angular.module('app',[]);
app.controller('ct',function($scope,localstr){
	// $scope.todo=todo;
	$scope.todo=localstr.getData("todo")
	$scope.index=$scope.todo.length-1;
	$scope.flag=false;
	$scope.flag1=false;
	$scope.title=todo.title;
	$scope.colorst=colors;
	$scope.tys=$scope.todo[$scope.index].color;
	$scope.tits=$scope.todo[$scope.index].title;


	$scope.check=function(i){
     $scope.index=i;
     $scope.tits=$scope.todo[i].title;
     $scope.tys=$scope.todo[i].color;
	}

	$scope.set=function(o,f){
		o.done=f;
		$scope.getdoneNums();
		localstr.saveData('todo',$scope.todo)
	}

    $scope.clearbth=function(){
      var list=$scope.todo[$scope.index].list;
      var arr=[];
      angular.forEach(list,function(v,i){
        if (v.done=='false') {
        	arr.push(v);
        };
      })
      $scope.todo[$scope.index].list=arr;
      $scope.flag=false;
      $scope.getdoneNums();
      localstr.saveData('todo',$scope.todo)
    }
     
     $scope.scolor=function(c){
     	$scope.tys=c;
     }

	$scope.change=function(o,text){
      o.title=text.target.innerHTML;
      localstr.saveData('todo',$scope.todo)
	}

	$scope.add=function(){
		$scope.ids=$scope.todo[$scope.todo.length-1].id+1;
		$scope.index=$scope.todo.length;
		$scope.todo.push({
			id:$scope.ids,
			title:'新列表'+$scope.ids,
			color:colors[$scope.todo.length%7],
			list:[]
		})
		$scope.getdoneNums();
		localstr.saveData(todo,$scope.todo)
	}

	  $scope.addlist=function(){
        $scope.todo[$scope.index].list.push({
            title:'',
            done:false
        })
        $scope.getdoneNums();
        localstr.saveData('todo',$scope.todo)
    }
   // 清除
    $scope.delList=function(){
    	if ($scope.todo.length==1) {
    		alert('数据至少需要一条')
    		return ;
    	};
    	$scope.todo.splice($scope.index,1);
    	$scope.index=$scope.todo.length-1;
    	$scope.flag1=false;
    	localstr.delData('todo')
    	localstr.saveData('todo',$scope.todo)
    }
     // 完成
     $scope.finished=function(){
     	var o=$scope.todo[$scope.index];
     	o.color=$scope.tys;
     	o.title=$scope.tits;
     	$scope.flag1=false;
     	localstr.saveData('todo',$scope.todo)
     }

    //    已完成
    $scope.doneNums=0;
    $scope.getdoneNums=function(){
        $scope.doneNums=0;
        var list =$scope.todo[$scope.index].list;
        angular.forEach(list,function(v){
            if (v.done==true) {
                $scope.doneNums+=1;
            }
        })
    }
   $scope.getdoneNums()


	$scope.$watch('index',function(){
		$scope.getdoneNums();
		$scope.tys=$scope.todo[$scope.index].color;
	    $scope.tits=$scope.todo[$scope.index].title;
	})

})

app.factory('localstr',function(){
   	return{
   		getData:function(key){
         var d=localStorage.getItem("todo");
	if(d!=null){
		return JSON.parse(d);
	}else return [];
   		},
   		saveData:function(key,data){
         localStorage.setItem("todo",JSON.stringify(data));
   		},
   		delData:function(key){
          localStorage.removeItem(key)
   		}
   	}
 })









