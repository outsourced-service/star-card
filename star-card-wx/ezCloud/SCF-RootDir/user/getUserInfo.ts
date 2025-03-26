const {
	getPayload,
	query,
	mutation,
	parseJwtToken,
	getClientinfo,
	callScf
} =
ezcloud;

const {
	user_token,
	developer_token
} = getClientinfo();

const {
	user_pk
} = parseJwtToken(user_token);

const [user] = query({
	name: "user",
	args: {
		where: {
			id: {
				_eq: user_pk,
			},
		},
	},
	fields: `id nickname avatar{id url} profile photographer{id photographer_name}`,
});
return {
	...user,
	fens_count: 50,
	followers_count: 50,
	coupons_count: 10,
	orders_count: 10,
	favorites_count: 10,
	is_photographer: user?.photographer?.id > 0,
};