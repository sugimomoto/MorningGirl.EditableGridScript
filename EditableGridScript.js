// 予測計算Script
function CalculateForecast(context)
{
	debugger;
	
	// 実行コンテキストからAttributeオブジェクトを取得
	var attributesObject = context.getFormContext().data.entity.attributes;
	var guid = context.getFormContext().data.entity.getId();
	
	// 確率・売上見込・予測のフィールドを取得
	var closeprobability = attributesObject.getByName("closeprobability");
	var estimatedvalue = attributesObject.getByName("estimatedvalue");
	var int_forecast = attributesObject.getByName("int_forecast");
	
	// いずれかのフィールドが存在しない場合、実行しない
	if(!closeprobability || !estimatedvalue || !int_forecast)
		return;
	
	// 確率の値をチェック。値が0ないしNullであれば、通知を表示
	if(isNullOrEmptyNotfication(closeprobability,guid))
		return;

	// 売上見込の値をチェック。値が0ないしNullであれば、通知を表示
	if(isNullOrEmptyNotfication(estimatedvalue, guid))
		return;
	
	// 確率＊売上見込＊0.01で予測金額を算出
	int_forecast.setValue(estimatedvalue.getValue() * closeprobability.getValue() * 0.01);
}

// 値のチェックと通知の表示
function isNullOrEmptyNotfication(attribute, guid)
{
	var val = attribute.getValue();
	var control = attribute.controls.getByIndex(0);
	
	// 値が0やnullの場合は、通知を表示
	if(!val)
	{
		control .setNotification(control.getLabel() + "の値が入力されていません。",guid)
		return true;	
	}	
	else
	{
		control .clearNotification(guid)
		return false;	
	}	
}