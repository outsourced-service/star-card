
export const ez_system = `id
    created_at
    updated_at
    idx
    name
    is_logs
    is_developer_auth
    pre_middelware_code
    post_middelware_code
    global_config
    af_id
    af_version
`

export const ez_scf = `id
    created_at
    updated_at
    scf_dir
    scf_name
    description
    scf_code
    parameters
    returns
`

export const ez_logs = `id
    created_at
    updated_at
    ez_logs_parent_ez_logs
    scf_dir
    scf_name
    payload
    clientinfo
    code
    msg
    callback_body
    callback_input
    data
    errors
`

export const ez_developer = `id
    created_at
    updated_at
    username
    password
    permission
`

export const user = `id
    created_at
    updated_at
    user_inviteparent_user
    user_id
    username
    password
    mobile
    nickname
    avatar
    name
    sex
    birthday
    profile
    attach_data
    role
    is_authentication
    is_personal
    is_recommend
    background_image
    score
    growth_value
    province
    city
    area
    location
    address_detail
    address_title
    address_info
    house
    start_business_hours
    exp_business_hours
    account
    user_cardcabinet
    user_cardcabinet_collection
    user_card_collection
    user_acc
    address
    user_logs
    user_scorelogs
    user_coupon
`

export const user_viplevel = `id
    created_at
    updated_at
    user_user
    viplevel_viplevel
    status
`

export const user_cardcabinet = `id
    created_at
    updated_at
    user_user
    name
    idx
    avatar
    is_top
    is_private
    introduce
    user_card
    user_visit
`

export const user_card = `id
    created_at
    updated_at
    user_cardcabinet_user_cardcabinet
    card_id
    evaluation
    card_type
    card_year
    particular_year
    card_category
    cn_publisher
    card_series
    card_role
    cn_sub_series
    card_number
    rarity_degree
    limited_edition
    card_name
    card_cover{id url}
    card_img{id url}
    card_sign
    category_score
    sign_score
    current_score
    max_score
    is_relation
    is_new
    is_top
    is_select
    is_edit
    is_open
    card_remarks
    date_obtained
    get_price
    status
    user_card_collection
    order_scoring_annex
    card_img{id url}
`

export const user_visit = `id
    created_at
    updated_at
    user_cardcabinet_user_cardcabinet
    user_card_user_card
    order_scoring_annex_order_scoring_annex
    user_visited_user
    user_user
    type
    is_collect
    share_times
    visit_times
    last_visit_time
    start_visit_time
`

export const user_coupon = `id
    created_at
    updated_at
    user_user
    coupon_coupon
    show_name
    start_time
    exp_time
    describe
    status
    user_coupon_status
`

export const address = `id
    created_at
    updated_at
    user_user
    phone
    consignee
    province
    city
    area
    location
    address_title
    address_info
    address_detail
    house
    set_default_num
    order_address
`

export const user_acc = `id
    created_at
    updated_at
    user_user
    type
    acc_val
    acc_val_vdt
    attach_config
`

export const user_logs = `id
    created_at
    updated_at
    user_user
    type
    title
    content
    attach_data
`

export const user_scorelogs = `id
    created_at
    updated_at
    user_user
    start_val
    inc_val
    end_val
    describe
    is_read
    type
    attach_data
`

export const user_search = `id
    created_at
    updated_at
    user_user
    type
    content
`

export const user_label = `id
    created_at
    updated_at
    user_user
    name
`

export const user_category = `id
    created_at
    updated_at
    user_user
    name
`

export const card_library = `id
    created_at
    updated_at
    type_category
    card_cover{id url}
    card_img{id url}
    card_name
    card_category
    cn_category
    eng_category
    img_category{id url}
    particular_year
    card_year
    year_remarks
    cn_publisher
    eng_publisher
    img_publisher{id url}
    card_ranks
    abbr_ranks
    cn_ranks
    eng_ranks
    img_ranks{id url}
    card_series
    abbr_series
    img_series{id url}
    cn_sub_series
    eng_sub_series
    card_number
    card_role
    cn_role
    eng_role
    img_role{id url}
    cn_rare_degree
    eng_rare_degree
    limited_edition
    cn_position
    eng_position
`

export const card_category = `id
    created_at
    updated_at
    name
    user_card
`

export const card_img = `id
    created_at
    updated_at
    user_card_user_card
    order_scoring_annex_order_scoring_annex
    img{id url}
    idx
    is_scanning
    image_type
`

export const card_info = `id
    created_at
    updated_at
    user_card_user_card
    order_scoring_annex_order_scoring_annex
    name
    scoring
    idx
`

export const card_label = `id
    created_at
    updated_at
    user_card_user_card
    name
`

export const viplevel = `id
    created_at
    updated_at
    name
    description
    min_growth_value
    img{id url}
    status
`

export const viplevel_privilege = `id
    created_at
    updated_at
    viplevel_viplevel
    name
    value
`

export const coupon = `id
    created_at
    updated_at
    name
    img{id url}
    show_name
    type
    amount_cny
    min_price_cny
    discount_rate
    activity_starttime
    activity_endtime
    start_time
    exp_time
    max_use_limit
    describe
    status
    user_coupon
`

export const category = `id
    created_at
    updated_at
    name
    idx
`

export const tags = `id
    created_at
    updated_at
    name
    idx
`

export const goods = `id
    created_at
    updated_at
    category_category
    goods_name
    goods_img{id url}
    idx
    start_sale_time
    show_sales
    status
`

export const goods_intro = `id
    created_at
    updated_at
    goods_goods
    idx
    type
    img{id url}
`


export const goods_attri_spec = `id
    created_at
    updated_at
    goods_attri_goods_attri
    idx
    img{id url}
    value
`

export const goods_attri = `id
    created_at
    updated_at
    goods_goods
    type
    name
    idx
    goods_attri_spec{
        ${goods_attri_spec}
    }
`

export const goods_sku_attri_spec = `id
    created_at
    updated_at
    goods_sku_goods_sku
    goods_attri_goods_attri
    goods_attri_spec_goods_attri_spec
    goods_attri_spec{
        ${goods_attri_spec}
    }
    goods_attri{
        ${goods_attri}
    }
`

export const goods_sku = `id
    created_at
    updated_at
    goods_goods
    sku_name
    price
    original_price
    stock
    present_score
    growth_value
    sales
    fictitious_sales
    status
    is_deleted
`

export const cart = `id
    created_at
    updated_at
    user_user
    goods_sku_goods_sku
    is_selected
    num
`

export const scoregoods = `id
    created_at
    updated_at
    type
    name
    scoregoods_img{id url}
    stock
    score_price
    listing_time
    is_deleted
    idx
    status
`

export const scoregoods_order = `id
    created_at
    updated_at
    user_user
    scoregoods_scoregoods
    name
    scoregoods_img{id url}
    score_price
    num
    pay_amount
    phone
    consignee
    province
    city
    area
    location
    address_detail
    deliver_name
    deliver_number
    is_deleted
    process_status
`

export const order = `id
    created_at
    updated_at
    evaluation_evaluation
    mode
    title
    exp_time
    evaluation_name
`

export const order_info = `id
    created_at
    updated_at
    user_user
    inviteparent_order_info
    order_id
    payment_method
    payment_pk
    pay_amount
    total_price
    discount_amount
    deliver_fee
    insure_fee
    insure_amount
    coupon_amount
    pay_score_amount
    total_score
    order_time
    pay_time
    estimate_time
    exp_time
    come_from
    num
    evaluation_notes
    notes
    delivery_name
    delivery_number
    back_delivery_number
    is_supplementary_payment
    is_select
    is_deleted
    is_tips
    stock_status
    coupon_status
    text_status
    process_status
    status
`

export const order_info_paydetail = `id
    created_at
    updated_at
    order_info_order_info
    type
    inc_amount
    deal_type
    attach_data
    describe
`

export const order_progress = `id
    created_at
    updated_at
    order_info_order_info
    type
    title
    content
    confirm_time
    attach_data
    status
`

export const order_annex = `id
    created_at
    updated_at
    order_info_order_info
    dir
    img{id url}
`

export const order_user_annex = `id
    created_at
    updated_at
    order_info_order_info
    img{id url}
`

export const order_scoring_annex = `id
    created_at
    updated_at
    order_info_order_info
    img{id url}
    card_code
    card_category
    card_sign
    card_year
    current_score
    max_score
    content
`

export const order_goods_sku = `id
    created_at
    updated_at
    order_info_order_info
    goods_sku_goods_sku
    goods_name
    goods_img{id url}
    price
    orig_price
    cost_price
    num
    present_score
    growth_value
`

export const order_goods_attri_spec = `id
    created_at
    updated_at
    order_goods_sku_order_goods_sku
    idx
    name
    value
    img{id url}
`

export const order_address = `id
    created_at
    updated_at
    order_info_order_info
    address_address
    consignee
    phone
    province
    city
    area
    location
    address_title
    address_info
    address_detail
    house
    set_default_num
`

export const order_evaluation_insurance = `id
    created_at
    updated_at
    order_info_order_info
    name
    description
    label_name
    price
    is_input
`

export const order_evaluation_insurance_info = `id
    created_at
    updated_at
    order_info_order_info
    type
    name
    cover{id url}
    description
    price
`

export const banner = `id
    created_at
    updated_at
    name
    type
    resource_type
    idx
    img{id url}
    video{id url}
    path
    attach_data
    exp_time
    order_title
    status
`

export const evaluation = `id
    created_at
    updated_at
    type
    name
    wechat_wx
    logo
    cover{id url}
    img{id url}
    sort_weight
    exp_time
    order_title
    consignee
    phone
    province
    city
    area
    location
    address_detail
    description
    evaluation_title
    order
`

export const evaluation_label = `id
    created_at
    updated_at
    name
`

export const evaluation_privilege = `id
    created_at
    updated_at
    evaluation_evaluation
    num_limit
    num_discount
    description
`

export const evaluation_insurance = `id
    created_at
    updated_at
    evaluation_evaluation
    name
    description
    card_price_limit
    card_often
    card_special_restrictions
    estimated_time_frame
    label_name
    price
    is_input
    evaluation_insurance_info
`

export const evaluation_insurance_info = `id
    created_at
    updated_at
    type
    name
    cover{id url}
    description
    price
`

export const evaluation_annex = `id
    created_at
    updated_at
    evaluation_evaluation
    dir
    img{id url}
    text
`

export const resource = `id
    created_at
    updated_at
    name
    dir
    title
    resource_type
    is_variable
    idx
    img{id url}
    video{id url}
    file{id url}
    text
    path
    attach_data
`

export const diction = `id
    created_at
    updated_at
    name
    describe
`

export const diction_logs = `id
    created_at
    updated_at
    diction_diction
    value
    describe
    idx
`
