import ezInstance from "@/utils/ezInstance";
import { login } from "@/api/login/index";
const { api, ezserver, apiInit, ezclient } = ezInstance;

const userFields =[
	"id created_at user_id username mobile nickname avatar_id name sex birthday profile attach_data score user_inviteparent_user city role is_authentication is_personal is_recommend background_image_id province area location fz_distance_from_location address_detail house start_business_hours exp_business_hours address_title address_info growth_value edit_time"
]

export const getUserInfo = async () => {
	const { userID } = await login()
	const user = await ezclient.queryGetFirstOne({
		name: "user",
		args: { where: { id: { _eq: userID } } },
		fields: userFields
	})
	console.log(user);
	return user
}