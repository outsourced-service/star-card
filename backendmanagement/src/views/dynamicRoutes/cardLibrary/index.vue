<template>
	<div class="system-user-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto" style="height: 100%" body-class="el-card-tabel">
			<template #header>
				<div class="system-menu-search align-center">
					<div class="align-center">
						<!-- <el-switch
						    v-model="tableData.searchType"
						    class="ml10"
							active-value="TCG"
							inactive-value="SPORTS"
						    active-text="TCG"
						    inactive-text="SPORTS"
							inline-prompt
							@change="getTableData"
							style="--el-switch-off-color: #13ce66"
							width="80px"
						  /> -->
						<el-select
						      v-model="tableData.searchType"
							  size="default"
							  class="ml10"
							  placeholder="请选择卡片大类"
							  @change="getTableData"
							  style="width: 180px"
						    >
						      <el-option
						        v-for="item in dialog.options"
						        :key="item"
						        :label="item"
						        :value="item"
						      />
						</el-select>
						<el-input size="default" clearable v-model="tableData.search" class="ml10" placeholder="请输入描述"
							style="width: 180px" @clear="getTableData">
						</el-input>
						<el-button size="default" type="primary" class="ml10" :icon="Search" @click="getTableData"> 查询
						</el-button>
						<el-button size="default" type="success" class="ml10" :icon="FolderAdd" @click="openDialogCurdFormRef({})"> 新增 </el-button>
					</div>
				</div>
			</template>
			<el-table :data="tableData.data" v-loading="tableData.loading" height="100%" style="width: 100%">
				<el-table-column prop="id" show-overflow-tooltip label="序号" width="60" />
				<el-table-column prop="type_category" label="卡片大类" />
				<el-table-column v-slot="scope" prop="card_cover" label="卡片封面图">
					<div v-if="scope.row.card_cover?.url">
						<el-image style="width: 60px; height: 100px; border-radius: 10%" :src="scope.row.card_cover?.url"
							fit="cover" :preview-src-list="[scope.row.card_cover?.url]" preview-teleported />
					</div>
					<div v-else>-</div>
				</el-table-column>
				<el-table-column v-slot="scope" prop="card_img" label="卡片背面图">
					<div v-if="scope.row.card_img?.url">
						<el-image style="width: 60px; height: 100px; border-radius: 10%" :src="scope.row.card_img?.url"
							fit="cover" :preview-src-list="[scope.row.card_img?.url]" preview-teleported />
					</div>
					<div v-else>-</div>
				</el-table-column>
				<el-table-column prop="card_name" label="卡片完整名称" show-overflow-tooltip/>
				<el-table-column prop="card_category" label="卡片类别名称" />
				<!-- <el-table-column prop="cn_category" label="卡片类别名称中文" />
				<el-table-column prop="eng_category" label="卡片类别名称英文" /> -->
				<!-- <el-table-column v-slot="scope" prop="img_category" label="卡片类别名称logo">
					<div v-if="scope.row.img_category?.url">
						<el-image style="width: 60px; height: 40px; border-radius: 10%" :src="scope.row.img_category?.url"
							fit="cover" :preview-src-list="[scope.row.img_category?.url]" preview-teleported />
					</div>
					<div v-else>-</div>
				</el-table-column> -->
				<el-table-column prop="particular_year" label="卡片年份" />
				<!-- <el-table-column prop="card_year" label="卡片年份" />
				<el-table-column prop="year_remarks" label="备用年份" /> -->
				<el-table-column v-slot="scope" prop="cn_publisher" label="发行商名称">
					{{ scope.row.cn_publisher }} {{ scope.row.eng_publisher }}
				</el-table-column>
				<!-- <el-table-column prop="cn_publisher" label="发行商名称中文" />
				<el-table-column prop="eng_publisher" label="发行商名称英文" /> -->
				<el-table-column v-slot="scope" prop="img_publisher" label="发行商logo">
					<div v-if="scope.row.img_publisher?.url">
						<el-image style="width: 60px; height: 40px; border-radius: 10%" :src="scope.row.img_publisher?.url"
							fit="cover" :preview-src-list="[scope.row.img_publisher?.url]" preview-teleported />
					</div>
					<div v-else>-</div>
				</el-table-column>
				<el-table-column v-if="tableData.searchType === 'TCG'" prop="abbr_ranks" label="卡牌分类" />
				<!-- <el-table-column v-if="tableData.searchType === 'SPORTS'" prop="card_ranks" label="队伍昵称" />
				<el-table-column  v-if="tableData.searchType === 'SPORTS'" prop="abbr_ranks" label="队伍中文缩写" /> -->
				<el-table-column v-if="tableData.searchType === 'SPORTS'" v-slot="scope" prop="cn_ranks" label="队伍名称" show-overflow-tooltip>
					{{ scope.row.cn_ranks }} {{ scope.row.eng_ranks }}
				</el-table-column>
				<!-- <el-table-column v-else prop="cn_ranks" label="队伍名称中文" />
				<el-table-column v-else prop="eng_ranks" label="队伍名称英文" /> -->
				<el-table-column v-if="tableData.searchType === 'SPORTS'" v-slot="scope" prop="img_ranks" label="队伍logo">
					<div v-if="scope.row.img_ranks?.url">
						<el-image style="width: 60px; height: 60px; border-radius: 10%" :src="scope.row.img_ranks?.url"
							fit="cover" :preview-src-list="[scope.row.img_ranks?.url]" preview-teleported />
					</div>
					<div v-else>-</div>
				</el-table-column>
				<!-- <el-table-column v-else prop="img_ranks" label="队伍logo" /> -->
				<!-- <el-table-column prop="card_series" label="系列昵称" v-if="tableData.searchType === 'TCG'"/>
				<el-table-column prop="abbr_series" label="系列缩写" v-if="tableData.searchType === 'TCG'"/> -->
				<el-table-column v-if="tableData.searchType === 'TCG'" v-slot="scope" prop="cn_ranks" label="系列名称">
					{{ scope.row.card_series }} {{ scope.row.abbr_series }}
				</el-table-column>
				<el-table-column prop="card_series" label="系列" v-if="tableData.searchType === 'SPORTS'"/>
				<el-table-column prop="abbr_series" label="系列(昵称)" v-if="tableData.searchType === 'SPORTS'"/>
				<!-- <el-table-column prop="img_series" label="系列logo" /> 表里没有-->
				<el-table-column v-slot="scope" prop="cn_ranks" label="系列世代" v-if="tableData.searchType === 'TCG'">
					{{ scope.row.cn_sub_series }} {{ scope.row.eng_sub_series }}
				</el-table-column>
				<el-table-column v-if="tableData.searchType === 'SPORTS'" prop="cn_sub_series" label="子系列" />
				<el-table-column v-if="tableData.searchType === 'SPORTS'" prop="eng_sub_series" label="子系列(昵称)" />
				<el-table-column prop="card_number" :label="tableData.searchType === 'TCG' ? '系列编号' : '卡片编号'" />
				<!-- <el-table-column prop="card_role" label="角色昵称" /> -->
				<el-table-column v-slot="scope" prop="cn_ranks" label="角色名称" show-overflow-tooltip>
					{{ scope.row.cn_role }} {{ scope.row.eng_role }}
				</el-table-column>
				<!-- <el-table-column prop="cn_role" label="角色名称中文" />
				<el-table-column prop="eng_role" label="角色名称英文" /> -->
				<el-table-column v-slot="scope" prop="img_role" label="角色logo" v-if="tableData.searchType === 'SPORTS'">
					<div v-if="scope.row.img_role?.url">
						<el-image style="width: 60px; height: 100px; border-radius: 10%" :src="scope.row.img_role?.url"
							fit="cover" :preview-src-list="[scope.row.img_role?.url]" preview-teleported />
					</div>
					<div v-else>-</div>
				</el-table-column>
				<!-- <el-table-column prop="img_role" label="角色logo" /> -->
				<!-- <el-table-column v-slot="scope" prop="cn_rare_degree" label="罕度/折射" v-if="tableData.searchType === 'SPORTS'">
					{{ scope.row.cn_rare_degree }} {{ scope.row.eng_rare_degree }}
				</el-table-column> -->
				<!-- <el-table-column prop="cn_rare_degree" label="罕见度名称中文" />
				<el-table-column prop="eng_rare_degree" label="罕见度名称英文" /> -->
				<!-- <el-table-column prop="limited_edition" label="限编" v-if="tableData.searchType === 'SPORTS'"/> -->
				<el-table-column v-if="tableData.searchType === 'SPORTS'" v-slot="scope" prop="cn_position" label="位置中英文名称">
					{{ scope.row.cn_position }} {{ scope.row.eng_position }}
				</el-table-column>
				<!-- <el-table-column prop="cn_position" label="位置名称中文" />
				<el-table-column prop="eng_position" label="位置名称英文" /> -->
				<el-table-column v-if="tableData.searchType === 'TCG'" v-slot="scope" prop="cn_attribute" label="属性">
					{{ scope.row.cn_attribute }} {{ scope.row.eng_attribute }}
				</el-table-column>
				<!-- <el-table-column prop="cn_attribute" label="属性中文" />
				<el-table-column prop="eng_attribute" label="属性英文" /> -->
				<el-table-column v-if="tableData.searchType === 'TCG'" v-slot="scope" prop="cn_language" label="语言">
					{{ scope.row.cn_language }} {{ scope.row.eng_language }}
				</el-table-column>
				<!-- <el-table-column prop="cn_language" label="语言中文" />
				<el-table-column prop="eng_language" label="语言英文" /> -->
				<el-table-column v-if="tableData.searchType === 'TCG'" v-slot="scope" prop="cn_series_types" label="系列种类">
					{{ scope.row.cn_series_types }} {{ scope.row.eng_series_types }}
				</el-table-column>
				<!-- <el-table-column prop="cn_series_types" label="系列种类中文" />
				<el-table-column prop="eng_series_types" label="系列种类英文" /> -->
				<el-table-column v-if="tableData.searchType === 'TCG'" prop="card_code" label="卡牌编号" />
				<!-- <el-table-column v-if="tableData.searchType === 'TCG'" prop="illustrator" label="插画师" /> -->
				<el-table-column label="操作" fixed="right" width="100px">
					<template #default="scope">
						<div class="buttonAggregate">
							<el-button size="small" text type="primary" @click="viewDetail(scope.row.id)">详情</el-button>
							<el-button size="small" text type="primary" @click="openDialogCurdFormRef(scope.row)">编辑</el-button>
							<el-button size="small" text type="primary" @click="onDel(scope.row)">删除</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<template #footer>
				<el-pagination v-if="tableData.data.length > 0" @size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange" :pager-count="5" :page-sizes="[10, 30, 50]"
					v-model:current-page="tableData.param.pageNum" background
					v-model:page-size="tableData.param.pageSize" layout="total, sizes, prev, pager, next, jumper"
					:total="tableData.total">
				</el-pagination>
			</template>
		</el-card>
		<el-dialog :title="dialog.title" v-model="dialog.isShowDialog" width="70vw">
			<el-form ref="cardLibraryFormRef" :model="dialog.ruleForm" size="default" label-width="140" :rules="dialog.ruleForm.type_category == 'SPORTS' ? dialog.SPORTSrule : TCGrule">
				<el-row :gutter="50">
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="卡片大类" prop="type_category" >
							<el-select
							      v-model="dialog.ruleForm.type_category"
								  size="default"
								  placeholder="请选择卡片大类"
								  @change="changeFormType(dialog.ruleForm.type_category)"
							    >
							      <el-option
							        v-for="item in dialog.options"
							        :key="item"
							        :label="item"
							        :value="item"
							      />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="卡片完整名称" prop="card_name" >
							<el-input v-model="dialog.ruleForm.card_name" type="text" placeholder="请输入卡片完整名称" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item :label="dialog.ruleForm.type_category == 'TCG' ? '种类(中文)' : '卡片类别名称(中文)'" prop="cn_category" >
							<el-input v-model="dialog.ruleForm.cn_category" type="text" :placeholder="dialog.ruleForm.type_category == 'TCG' ? '请输入种类(中文)' : '请输入卡片类别名称(中文)'" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item :label="dialog.ruleForm.type_category == 'TCG' ? '种类(英文)' : '卡片类别名称(英文)'" prop="eng_category" >
							<el-input v-model="dialog.ruleForm.eng_category" type="text" :placeholder="dialog.ruleForm.type_category == 'TCG' ? '请输入种类(英文)' : '请输入卡片类别名称(英文)'" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20" v-if="dialog.ruleForm.type_category == 'TCG'">
						<el-form-item label="种类(昵称)" prop="card_category" >
							<el-input v-model="dialog.ruleForm.card_category" type="text" placeholder="请输入种类(昵称)" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="卡片年份" prop="particular_year" >
							<el-date-picker
							        v-model="dialog.ruleForm.particular_year"
							        type="date"
							        placeholder="请选择卡片年份"
							      />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="备用年份" prop="year_remarks" >
							<el-input v-model="dialog.ruleForm.year_remarks" type="text" placeholder="请输入卡片备用年份" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="发行商名称(中文)" prop="cn_publisher" >
							<el-input v-model="dialog.ruleForm.cn_publisher" type="text" placeholder="请输入卡片发行商中文名称" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="发行商名称(英文)" prop="eng_publisher" >
							<el-input v-model="dialog.ruleForm.eng_publisher" type="text" placeholder="请输入卡片发行商英文名称" clearable />
						</el-form-item>
					</el-col>
					
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item :label="dialog.ruleForm.type_category == 'TCG' ? '卡牌分类' : '队伍中文缩写'" prop="abbr_ranks" >
							<el-input v-model="dialog.ruleForm.abbr_ranks" type="text" :placeholder="dialog.ruleForm.type_category == 'TCG' ? '请输入卡牌分类' : '请输入队伍中文缩写'" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20" v-if="dialog.ruleForm.type_category == 'SPORTS'">
						<el-form-item label="队伍昵称" prop="card_ranks" >
							<el-input v-model="dialog.ruleForm.card_ranks" type="text" placeholder="请输入队伍昵称" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20" v-if="dialog.ruleForm.type_category == 'SPORTS'">
						<el-form-item label="队伍中文名称" prop="cn_ranks" >
							<el-input v-model="dialog.ruleForm.cn_ranks" type="text" placeholder="请输入队伍中文名称" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20" v-if="dialog.ruleForm.type_category == 'SPORTS'">
						<el-form-item label="队伍英文名称" prop="eng_ranks" >
							<el-input v-model="dialog.ruleForm.eng_ranks" type="text" placeholder="请输入队伍英文名称" clearable />
						</el-form-item>
					</el-col>
					
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item :label="dialog.ruleForm.type_category == 'TCG' ? '系列名称(中文)' : '系列'" prop="card_series" >
							<el-input v-model="dialog.ruleForm.card_series" type="text" :placeholder="dialog.ruleForm.type_category == 'TCG' ? '请输入系列名称(中文)' : '请输入系列'" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item :label="dialog.ruleForm.type_category == 'TCG' ? '系列名称(英文)' : '系列(昵称)'" prop="abbr_series" >
							<el-input v-model="dialog.ruleForm.abbr_series" type="text" :placeholder="dialog.ruleForm.type_category == 'TCG' ? '请输入系列名称(英文)' : '请输入系列(昵称)'" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item :label="dialog.ruleForm.type_category == 'TCG' ? '系列世代(中文)' : '子系列'" prop="cn_sub_series" >
							<el-input v-model="dialog.ruleForm.cn_sub_series" type="text" :placeholder="dialog.ruleForm.type_category == 'TCG' ? '请输入系列世代(中文)' : '请输入子系列名称(中文)'" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item :label="dialog.ruleForm.type_category == 'TCG' ? '系列世代(英文)' : '子系列(昵称)'" prop="eng_sub_series" >
							<el-input v-model="dialog.ruleForm.eng_sub_series" type="text" :placeholder="dialog.ruleForm.type_category == 'TCG' ? '请输入系列世代(英文)' : '请输入子系列名称(英文)'" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item :label="dialog.ruleForm.type_category == 'TCG' ? '系列编号' : '卡片编号'" prop="card_number" >
							<el-input v-model="dialog.ruleForm.card_number" type="text" :placeholder="dialog.ruleForm.type_category == 'TCG' ? '请输入系列编号' : '请输入卡片编号'" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="角色名称(中文)" prop="cn_role" >
							<el-input v-model="dialog.ruleForm.cn_role" type="text" placeholder="请输入卡片角色名称(中文)" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="角色名称(英文)" prop="eng_role" >
							<el-input v-model="dialog.ruleForm.eng_role" type="text" placeholder="请输入卡片角色名称(英文)" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="角色昵称" prop="card_role" >
							<el-input v-model="dialog.ruleForm.card_role" type="text" placeholder="请输入卡片角色昵称" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="罕见度名称(中文)" prop="cn_rare_degree" >
							<el-input v-model="dialog.ruleForm.cn_rare_degree" type="text" placeholder="请输入卡片罕见度名称(中文)" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="罕见度名称(英文)" prop="eng_rare_degree" >
							<el-input v-model="dialog.ruleForm.eng_rare_degree" type="text" placeholder="请输入卡片罕见度名称(英文)" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="限编" prop="limited_edition" >
							<el-input v-model="dialog.ruleForm.limited_edition" type="text" placeholder="请输入限编" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20" v-if="dialog.ruleForm.type_category == 'SPORTS'">
						<el-form-item label="位置名称(中文)" prop="cn_position" >
							<el-input v-model="dialog.ruleForm.cn_position" type="text" placeholder="请输入卡片位置名称(中文)" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20" v-if="dialog.ruleForm.type_category == 'SPORTS'">
						<el-form-item label="位置名称(英文)" prop="eng_position" >
							<el-input v-model="dialog.ruleForm.eng_position" type="text" placeholder="请输入卡片位置名称(英文)" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20" v-if="dialog.ruleForm.type_category == 'TCG'">
						<el-form-item label="属性(中文)" prop="cn_attribute" >
							<el-input v-model="dialog.ruleForm.cn_attribute" type="text" placeholder="请输入卡片属性(中文)" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20" v-if="dialog.ruleForm.type_category == 'TCG'">
						<el-form-item label="属性(英文)" prop="eng_attribute" >
							<el-input v-model="dialog.ruleForm.eng_attribute" type="text" placeholder="请输入卡片属性(英文)" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20" v-if="dialog.ruleForm.type_category == 'TCG'">
						<el-form-item label="语言(中文)" prop="cn_language" >
							<el-input v-model="dialog.ruleForm.cn_language" type="text" placeholder="请输入卡片语言(中文)" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20" v-if="dialog.ruleForm.type_category == 'TCG'">
						<el-form-item label="语言(英文)" prop="eng_language" >
							<el-input v-model="dialog.ruleForm.eng_language" type="text" placeholder="请输入卡片语言(英文)" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20" v-if="dialog.ruleForm.type_category == 'TCG'">
						<el-form-item label="系列种类(中文)" prop="cn_series_types" >
							<el-input v-model="dialog.ruleForm.cn_series_types" type="text" placeholder="请输入卡片系列种类(中文)" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20" v-if="dialog.ruleForm.type_category == 'TCG'">
						<el-form-item label="系列种类(英文)" prop="eng_series_types" >
							<el-input v-model="dialog.ruleForm.eng_series_types" type="text" placeholder="请输入卡片系列种类(英文)" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20" v-if="dialog.ruleForm.type_category == 'TCG'">
						<el-form-item label="卡牌编号" prop="card_code" >
							<el-input v-model="dialog.ruleForm.card_code" type="text" placeholder="请输入卡片插画师" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20" v-if="dialog.ruleForm.type_category == 'TCG'">
						<el-form-item label="插画师" prop="illustrator" >
							<el-input v-model="dialog.ruleForm.illustrator" type="text" placeholder="请输入卡片插画师" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="卡片封面图" prop="card_cover" >
							<uploadMedia v-model="dialog.ruleForm.card_cover" mode="image" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="卡片背面图" prop="card_img" >
							<uploadMedia v-model="dialog.ruleForm.card_img" mode="image" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="类别名称logo" prop="img_category" >
							<uploadMedia v-model="dialog.ruleForm.img_category" mode="image" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="发行商logo" prop="img_publisher" >
							<uploadMedia v-model="dialog.ruleForm.img_publisher" mode="image" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20" v-if="dialog.ruleForm.type_category == 'SPORTS'">
						<el-form-item label="队伍logo" prop="img_ranks" >
							<uploadMedia v-model="dialog.ruleForm.img_ranks" mode="image" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="角色logo" prop="img_role" >
							<uploadMedia v-model="dialog.ruleForm.img_role" mode="image" />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="onSubmit" size="default">确 认</el-button>
					<el-button @click="onCancel" size="default">取 消</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="cardLibrary">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Search, FolderAdd } from '@element-plus/icons-vue';
import { cardLibrary } from '/@/api/index';
import { useRouter } from 'vue-router';
import SPORTSrule from './SPORTSrule';
import TCGrule from './TCGrule';
import { string } from '/@/utils/test';
const curdFun = cardLibrary();
const router = useRouter();

// 引入组件
const uploadMedia = defineAsyncComponent(() => import('/@/components/upload/index.vue'));

// 定义变量内容
const cardLibraryFormRef = ref<FormInstance>();
const dialog = reactive({
	isShowDialog: false,
	row: <any>{},
	type: '',
	SPORTSrule: SPORTSrule,
	TCGrule: TCGrule,
	title: '',
	submitTxt: '',
	ruleForm: <any>{ id: 0 },
	options: ['TCG', 'SPORTS']
});
const tableData = reactive(<any>{
	loading: false,
	search: '',
	searchType: 'TCG',
	vip: '',
	data: [],
	total: 0,
	param: {
		pageNum: 1,
		pageSize: 10,
	},
	time: '',
});

const scale2Format = (value: string = '0') => {
	return Number.parseFloat(value).toFixed(2);
};

const viewDetail = (id: number) => {
    router.push(`/cardLibrary/${id}`);
};

// 查询方法
const getTableData = async () => {
	tableData.loading = true;
	const { list, total_size } = await curdFun.get(
		{
			page_index: tableData.param.pageNum,
			page_size: tableData.param.pageSize,
			where: {
				type_category: tableData.searchType ? { _eq: tableData.searchType } : {}
			},
		},
		{}
	);
	tableData.data = list;
	tableData.total = total_size;
	tableData.loading = false;
};

//初始化
const openDialogCurdFormRef = (row: any = {}) => {
	if (cardLibraryFormRef.value) cardLibraryFormRef.value.resetFields();
	dialog.row = row;
	dialog.type = row.id ? 'edit' : 'add';
	dialog.title = row.id ? '编辑' : '新增';
	dialog.submitTxt = row.id ? '修 改' : '新 增';
	dialog.ruleForm = JSON.parse(JSON.stringify(row));
	dialog.ruleForm.card_cover = row?.card_cover ? [row.card_cover] : [];
	dialog.ruleForm.card_img = row?.card_img ? [row.card_img] : [];
	dialog.ruleForm.img_category = row?.img_category ? [row.img_category] : [];
	dialog.ruleForm.img_publisher = row?.img_publisher ? [row.img_publisher] : [];
	dialog.ruleForm.img_ranks = row?.img_ranks ? [row.img_ranks] : [];
	dialog.ruleForm.img_role = row?.img_role ? [row.img_role] : [];
	dialog.ruleForm.type_category = row.type_category ? row.type_category : tableData.searchType
	dialog.isShowDialog = true;
};

const changeFormType = (type_category: any) => {
	dialog.ruleForm = {}
	dialog.ruleForm.type_category = type_category
};

// 取消
const onCancel = () => {
	dialog.isShowDialog = false;
	if (!cardLibraryFormRef.value) return;
	cardLibraryFormRef.value.resetFields();
};

//提交
const onSubmit = () => {
	cardLibraryFormRef.value.validate((valid: any) => {
		if (valid) {
			if (dialog.type === 'add') onAdd(dialog.ruleForm);
			if (dialog.type === 'edit') onUpd(dialog.ruleForm);
		}
	});
};

// 新增
const onAdd = (ruleForm: any) => {
	ElMessageBox.confirm('确认新增该数据吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			const { id: ID, cn_ranks, eng_ranks, card_category, card_cover, card_img, img_category, img_publisher, img_ranks, img_role, particular_year, card_year, ..._ins } = ruleForm;
			const yearData = new Date(particular_year)
			await curdFun
				.inc({
					..._ins,
					card_cover_id: card_cover[0].raw.imageId,
					card_img_id: card_img[0].raw.imageId,
					img_category_id: img_category.length > 0 ? img_category[0].raw.imageId : null,
					img_publisher_id: img_publisher.length > 0 ? img_publisher[0].raw.imageId : null,
					img_ranks_id: img_ranks.length > 0 ? img_ranks[0].raw.imageId : null,
					img_role_id: img_role.length > 0 ? img_role[0].raw.imageId : null,
					particular_year: yearData.toISOString().split('T')[0],
					card_year: String(yearData.getFullYear()),
					card_category: ruleForm.type_category === 'TCG' ? card_category : ruleForm.cn_category + " " + ruleForm.eng_category,
					cn_ranks: ruleForm.abbr_ranks,
					eng_ranks: ruleForm.abbr_ranks
				}, {})
				.then(() => {
					ElMessage({
						type: 'success',
						message: '添加成功！',
					});
					getTableData();
				})
				.catch(() => {
					ElMessage({
						type: 'error',
						message: '添加失败！',
					});
				})
				.finally(() => {
					onCancel();
				});
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '已取消添加',
			});
		});
};

// 修改
const onUpd = (ruleForm: any) => {
	ElMessageBox.confirm('确认修改该数据吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			const { id: ID, cn_ranks, eng_ranks, card_category, card_cover:[card_cover], card_img:[card_img], img_category:[img_category], img_publisher:[img_publisher], img_ranks:[img_ranks], img_role:[img_role], img_series, particular_year, card_year, ..._set } = ruleForm;
			const yearData = new Date(particular_year)
			await curdFun
				.set(
					ID,
					{
						_set,
						card_cover_id: card_cover?.raw?.imageId ?? card_cover?.id,
						card_img_id: card_img?.raw?.imageId ?? card_img?.id,
						img_category_id: img_category?.raw?.imageId ?? img_category?.id,
						img_publisher_id: img_publisher?.raw?.imageId ?? img_publisher?.id,
						img_ranks_id: img_ranks?.raw?.imageId ?? img_ranks?.id,
						img_role_id: img_role?.raw?.imageId ?? img_role?.id,
						particular_year: yearData.toISOString().split('T')[0],
						card_year: String(yearData.getFullYear()),
						card_category: ruleForm.type_category === 'TCG' ? card_category : ruleForm.cn_category + " " + ruleForm.eng_category,
						cn_ranks: ruleForm.abbr_ranks,
						eng_ranks: ruleForm.abbr_ranks
					},
					{}
				)
				.then(() => {
					ElMessage({
						type: 'success',
						message: '修改成功！',
					});
					getTableData();
				})
				.catch(() => {
					ElMessage({
						type: 'error',
						message: '修改失败！',
					});
				})
				.finally(() => {
					onCancel();
				});
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '已取消修改',
			});
		});
};

//删除
const onDel = (row: any) => {
	ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await curdFun.del(row.id, true, {}).then(() => {
				ElMessage({
					type: 'success',
					message: '删除成功',
				});
				getTableData();
			});
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '已取消删除',
			});
		});
};

// 分页改变
const onHandleSizeChange = (val: number) => {
	tableData.param.pageSize = val;
	getTableData();
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
	tableData.param.pageNum = val;
	getTableData();
};

// 页面加载时
onMounted(async () => {
	getTableData();
});
</script>

<style scoped lang="scss"></style>
