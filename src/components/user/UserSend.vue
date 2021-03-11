<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="8">
        <el-form ref="form" :model="form" label-width="150px" :rules="rules" status-icon>
          <el-form-item label="驿站选择" prop="admin" :required="true">
            <el-select v-model="form.admin" placeholder="请选择驿站" clearable>
              <el-option label="中苑" value="中苑"></el-option>
              <el-option label="西苑" value="西苑"></el-option>
              <el-option label="北苑" value="北苑"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="收件人姓名" prop="name" :required="true">
            <el-input v-model="form.name" clearable placeholder="请输入收件人姓名" style="width: 220px"></el-input>
          </el-form-item>
          <el-form-item label="收件人联系方式" prop="phone" :required="true">
            <el-input v-model="form.phone" clearable placeholder="请输入收件人联系方式" style="width: 220px"></el-input>
          </el-form-item>
          <el-form-item label="收件人地址" prop="addr" :required="true">
            <div class="block">
              <el-cascader
                v-model="form.addr"
                clearable
                filterable
                placeholder="请选择收件省市"
                :options="region"
                :props="{ expandTrigger: 'hover' }"
                @change="handleChangeCity"></el-cascader>
            </div>
          </el-form-item>

          <el-form-item label="物品信息" prop="info" :required="true">
            <el-select v-model="form.info" placeholder="请选择物品信息" clearable>
              <el-option label="日用品" value="中苑"></el-option>
              <el-option label="食品" value="西苑"></el-option>
              <el-option label="文件" value="北苑"></el-option>
              <el-option label="衣物" value="北苑"></el-option>
              <el-option label="数码产品" value="北苑"></el-option>
              <el-option label="其他" value="北苑"></el-option>
            </el-select>
          </el-form-item>
          <el-link type="primary" :underline="false" @click="prohibitDrawer = true">了解禁寄物品</el-link>

          <el-form-item label="物品重量" prop="weight" :required="true">
            <el-input-number v-model="form.weight" @change="handleChangeWeight" :min="1" :max="100" label="物品重量"></el-input-number>
          </el-form-item>
          <el-link type="primary" :underline="false" @click="priceTable = true">了解计费方式</el-link>

          <el-form-item label="有无原包装">
            <el-switch
              v-model="form.hasPack"
              active-text="有原包装"
              inactive-text="无原包装">
            </el-switch>
          </el-form-item>

          <el-form-item label="是否同意协议">
            <el-checkbox v-model="form.isRead">
              我已阅读并同意
              <el-link type="primary" :underline="false" @click="protocolDrawer = true">
                《服务协议》
              </el-link>
            </el-checkbox>
          </el-form-item>

          <el-form-item label="预估运费">
            ￥{{ form.price }}
            <el-link type="primary" :underline="false" @click="clickPrice">
              运费明细
            </el-link>
          </el-form-item>
          <el-button type="primary" @click="onSubmit('form')" :disabled="!form.isRead">立即下单</el-button>
        </el-form>
      </el-col>
    </el-row>

    <el-drawer
      :title=priceDataTitle
      :visible.sync="priceTable"
      direction="rtl"
      size="50%">
      <el-table :data="priceData">
        <el-table-column property="province" label="省份" width="200"></el-table-column>
        <el-table-column property="code" label="区域码" width="200"></el-table-column>
        <el-table-column property="base" label="首重价格" width="200"></el-table-column>
        <el-table-column property="continue" label="续重价格" width="200"></el-table-column>
      </el-table>
    </el-drawer>

    <el-drawer
      :title=prohibitDrawerTitle
      :visible.sync="prohibitDrawer"
      direction="rtl"
      size="50%"
      style="text-align: left;font-family: 仿宋;font-size: 20px">
      <h1>一、枪支（含仿制品、主要零部件）弹药</h1><br>
      <b>1. 枪支（含仿制品、主要零部件）</b>：如手枪、步枪、冲锋枪、防暴枪、气枪、猎枪、运动枪、麻醉注射枪、钢珠枪、催泪枪等。<br>
      <b>2. 弹药（含仿制品）</b>：如子弹、炸弹、手榴弹、火箭弹、照明弹、燃烧弹、烟幕（雾）弹、信号弹、催泪弹、毒气弹、地雷、手雷、炮弹、火药等。<br>
      <h1>二、管制器具</h1><br>
      <b>1. 管制刀具</b>：如匕首、三棱刮刀、带有自锁装置的弹簧刀（跳刀）、其他相类似的单刃、双刃、三棱尖刀等。<br>
      <b>2. 其他</b>：如弩、催泪器、催泪枪、电击器等。<br>
      <h1>三、爆炸物品</h1><br>
      <b>1. 爆破器材</b>：如炸药、雷管、导火索、导爆索、爆破剂等。<br>
      <b>2. 烟花爆竹</b>：如烟花、鞭炮、摔炮、拉炮、砸炮、彩药弹等烟花爆竹及黑火药、烟火药、发令纸、引火线等。<br>
      <b>3. 其他</b>：如推进剂、发射药、硝化棉、电点火头等。<br>
      <h1>四、压缩和液化气体及其容器</h1><br>
      <b>1. 易燃气体</b>：如氢气、甲烷、乙烷、丁烷、天然气、液化石油气、乙烯、丙烯、乙炔、打火机等。<br>' +
      <b>2. 有毒气体</b>：如一氧化碳、一氧化氮、氯气等。<br>
      <b>3. 易爆或者窒息、助燃气体</b>：如压缩氧气、氮气、氦气、氖气、气雾剂等。<br>
      <h1>五、易燃液体</h1><br>
      如汽油、柴油、煤油、桐油、丙酮、乙醚、油漆、生漆、苯、酒精、松香油等。<br>
      <h1>六、易燃固体、自燃物质、遇水易燃物质</h1><br>
      <b>1. 易燃固体</b>：如红磷、硫磺、铝粉、闪光粉、固体酒精、火柴、活性炭等。<br>
      <b>2. 自燃物质</b>：如黄磷、白磷、硝化纤维（含胶片）、钛粉等。<br>
      <b>3. 遇水易燃物质</b>：如金属钠、钾、锂、锌粉、镁粉、碳化钙（电石）、氰化钠、氰化钾等。<br>
      <h1>七、氧化剂和过氧化物</h1><br>
      如高锰酸盐、高氯酸盐、氧化氢、过氧化钠、过氧化钾、过氧化铅、氯酸盐、溴酸盐、硝酸盐、双氧水等。<br>
      <h1>八、毒性物质</h1><br>
      如砷、砒霜、汞化物、铊化物、氰化物、硒粉、苯酚、汞、剧毒农药等。<br>
      <h1>九、生化制品、传染性、感染性物质</h1><br>
      如病菌、炭疽、寄生虫、排泄物、医疗废弃物、尸骨、动物器官、肢体、未经硝制的兽皮、未经药制的兽骨等。<br>
      <h1>十、放射性物质</h1><br>
      如铀、钴、镭、钚等。<br>
      <h1>十一、腐蚀性物质</h1><br>
      如硫酸、硝酸、盐酸、蓄电池、氢氧化钠、氢氧化钾等。<br>
      <h1>十二、毒品及吸毒工具、非正当用途麻醉药品和精神药品、非正当用途的易制毒化学品</h1><br>
      <b>1. 毒品、麻醉药品和精神药品</b>：如鸦片（包括罂粟壳、花、苞、叶）、吗啡、海洛因、可卡因、大麻、甲基苯丙胺（冰毒）、氯胺酮、甲卡西酮、苯丙胺、安钠咖等。<br>
      <b>2. 易制毒化学品</b>：如胡椒醛、黄樟素、黄樟油、麻黄素、伪麻黄素、羟亚胺、邻酮、苯乙酸、溴代苯丙酮、醋酸酐、甲苯、丙酮等。<br>
      <b>3. 吸毒工具</b>：如冰壶等。<br>
      <h1>十三、非法出版物、印刷品、音像制品等宣传品</h1><br>
      如含有反动、煽动民族仇恨、破坏国家统一、破坏社会稳定、宣扬邪教、宗教极端思想、淫秽等内容的图书、刊物、图片、照片、音像制品等。<br>
      <h1>十四、间谍专用器材</h1><br>
      如暗藏式窃听器材、窃照器材、突发式收发报机、一次性密码本、密写工具、用于获取情报的电子监听和截收器材等。<br>
      <h1>十五、非法伪造物品</h1><br>
      如伪造或者变造的货币、证件、公章等。<br>
      <h1>十六、侵犯知识产权和假冒伪劣物品</h1><br>
      <b>1. 侵犯知识产权</b>：如侵犯专利权、商标权、著作权的图书、音像制品等。<br>
      <b>2. 假冒伪劣</b>：如假冒伪劣的食品、药品、儿童用品、电子产品、化妆品、纺织品等。<br>
      <h1>十七、濒危野生动物及其制品</h1><br>
      如象牙、虎骨、犀牛角及其制品等。<br>
      <h1>十八、禁止进出境物品</h1><br>
      如有碍人畜健康的、来自疫区的以及其他能传播疾病的食品、药品或者其他物品；内容涉及国家秘密的文件、资料及其他物品。<br>
      <h1>十九、其他物品</h1><br>
      《危险化学品目录》《民用爆炸物品品名表》《易制爆危险化学品名录》《易制毒化学品的分类和品种目录》《中华人民共和国禁止进出境物品表》载明的物品和《人间传染的病原微生物名录》载明的第一、二类病原微生物等，以及法律、行政法规、国务院和国务院有关部门规定禁止寄递的其他物品。'
    </el-drawer>

    <el-drawer
      :visible.sync="protocolDrawer"
      direction="rtl"
      size="50%"
      style="text-align: left;font-family: 仿宋;font-size: 20px">
      <h1>《寄件服务协议》</h1><br>
      来源：<a href="https://www.zto.com/service/service.html" target="_blank" style="color: black">https://www.zto.com/service/service.html</a><br><br>
      尊敬的用户，欢迎您使用基于Web的校园快递管理系统的寄件服务。<br><br>
      ★当您选择本系统寄件并点击立即下单前，请您仔细阅读并遵守《寄件服务协议》。<br><br>
      欢迎用户（以下称“您”）签署《寄件用户服务协议》（下称“本协议”）并使用基于Web的校园快递管理系统的寄件服务！<br><br>
      <b>【审慎阅读】</b><br><br>
      您在使用本系统服务时点击同意本协议之前，应当认真阅读本协议。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。免除或者限制责任的条款将以粗体下划线标识，您应重点阅读。如您对协议有任何疑问，可向本系统管理员咨询。<br><br>
      <b>【签约动作】</b><br><br>
      当您进入寄件订单信息填写页面按页面提示填写信息、勾选“我已阅读并同意服务协议”、点击“下单”，即表示您已充分阅读、理解并接受本协议的全部内容。阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止使用本系统寄件服务。<br><br>
      <b>【特别提示】</b><br><br>
      信息收集与保护：寄递过程中产生的信息，包括但不限于寄件人及收件人的姓名/名称、地址、电话，会被收集储存，并会被用于服务的改善或推广。<br><br>
      <b>【详情】</b><br><br>
      <b>1.定义、生效及适用范围</b><br><br>
      <b>1.1定义</b><br><br>
      （1）寄件人系指委托寄送快件的一方。<br><br>
      （2）收件人系指由寄件人指定收取快件的一方。<br><br>
      <b>1.2生效</b><br><br>
      寄件人通过填写快递面单（电子面单或纸质面单）提交订单并向快递服务组织交付须寄递的快件后，视为寄件人与快递服务组织签署本协议并即时生效。快递面单是本协议的组成部分。<br><br>
      <b>1.3适用范围</b><br><br>
      本协议适用于基于 Web 的校园快递管理系统揽收的寄件地址位于校园境内的快递业务。<br><br>
      <b>2.双方的权利与义务</b><br><br>
      <b>2.1禁寄物品</b><br><br>
      寄件人不得交寄法律法规或相关政府主管部门规定禁止和限制寄递的物品以及本系统不予收寄或限制收寄的物品。快递服务组织在寄递过程中发现前述物品的，有权根据实际情况，采取包括但不限于退件、扣押、转交相关主管部门等措施。因交寄禁寄物品造成快递服务组织或第三人人身财产损害及其他损失的，寄件人应当予以赔偿。<br><br>
      <b>2.2实名验证</b><br><br>
      寄件人应准确、完整、如实地填写快递面单并提供有效身份证件进行实名验证；寄件人为法人的，应提供法人证照及法定代表人或相关负责人的身份证件进行实名验证。寄件人同意快递服务组织记录、留存相关证件信息。<br><br>
      <b>2.3验视</b><br><br>
      快递服务组织有权对寄件人交寄物品进行开箱验视；对于无法判定内件属性的交寄物品，有权要求寄件人出具有效证明。寄件人不配合验视的，快递服务组织有权不予揽收或退回已揽收快件。<br><br>
      <b>2.4包装</b><br><br>
      寄件人应妥善包装交寄物品，确保符合寄递要求 （包装注意事项） ，因快件包装不善造成快件损毁、遗失的，快递服务组织不予赔偿；因此造成快递服务组织或第三方人身财产损害的，寄件人应当予以赔偿。寄件人委托快递服务组织进行包装的，快递服务组织有权收取相应的包装费用。<br><br>
      <b>2.5服务费</b><br><br>
      （1）寄件人应按快递服务组织公示的或双方约定的计费方式、费率及时支付相应的服务费及相关费用。如寄件人选择到付服务但收件人拒绝支付费用的，则费用应由寄件人承担。如涉及退件的，相应费用亦由寄件人承担。如寄件人选择保价、代收货款、尊享等其他服务的，应按照约定支付相应费用。<br><br>
      （2）寄件人逾期支付服务费及相关费用的，每逾期一日，应按逾期金额千分之一支付违约金，但双方另有约定的除外。<br><br>
      （3）寄件人拖欠服务费及相关费用的，快递服务组织除按照上述约定收取违约金外，还有权留置交寄物品。留置期超过70天寄件人仍未付清拖欠款项的，快递服务组织有权通过变卖、拍卖等合理方式处置留置物品，所获收益扣除处置费用、拖欠服务费用后仍有剩余的，返还寄件人。<br><br>
      <b>3.赔偿标准</b><br><br>
      3.1因快递服务组织原因导致快件延误、损毁与遗失的，按以下方式处理：<br><br>
      （1）快件未按约定或承诺的时限内送达的，免除相应的快递服务费用；<br><br>
      （2）快件发生损毁、遗失（包括全部或部分损毁、遗失）的，按以下方式赔偿：<br><br>
      ① 未保价快件，按照实际价值损失赔偿，但最高不超过人民币500元（含）；<br><br>
      ② 已保价快件，按照实际价值损失赔偿，但最高不超过申报价值；如快件未足额保价的，则赔偿金额按保价率折扣，即赔偿金额=实际价值损失*申报价值/实际价值；<br><br>
      ③ 除本协议另有约定外，未保价且无法提供有效价值证明的，则按照该票快件的快递服务费的3倍赔偿。<br><br>
      无论在何种情况下，快递服务组织均不对预期收益、利润、商业机会等任何间接损失进行赔偿。<br><br>
      3.2寄件人或寄件人指定的第三方在知晓或应当知晓快件发生损毁、遗失后30天之内应向快递服务组织提出理赔要求并附上相应证明材料，逾期则快递服务组织有权不予受理且将不再承担任何责任。<br><br></h4>
      3.3寄件人或寄件人指定的第三方向快递服务组织提出理赔时，应提供以下证明材料：<br><br>
      （1）寄件人或寄件人指定的第三方的有效身份证明材料、授权书、含保价服务的寄件面单、发票、付款凭证及寄递物品的清单以及物品的损毁报告或检测报告等有效证明材料；<br><br>
      （2）其他有效证明材料。<br><br>
      寄件人或寄件人指定的第三方在上述30天的理赔期限内未及时提供有关证明材料导致快递服务组织无法核实证明材料的真实性以及无法核实交寄物实际价值损失的责任由寄件人自行承担。<br><br>
      3.4寄件人或寄件人指定的第三方要求快递服务组织将保价快件剩余的物品或损毁的物品返还的，快递服务组织可直接在赔偿金额中扣除该票保价快件的物品残值及相应的返件等相关费用。寄件人或寄件人指定的第三方未明示处置要求或不同意返还的，快递服务组织按照协议中的退件要求处理。<br><br>
      3.5寄件人或寄件人指定的第三方有且仅能针对单票快件提出一次理赔要求，且对于该票快件丢失或损毁的结算是全额且终局的。<br><br>
      <b>4.信息收集及使用</b><br><br>
      寄件人同意并遵守本系统所公示的信息保护和隐私政策及其不定期修订的内容，确保其向快递服务组织提供的收件人姓名/名称、地址、电话、证件等信息为合法获取并经有效授权使用。快递服务组织有权收集、存储、编辑、传输寄件人和收件人提供的或在相关服务中形成的各项信息，并为提供、改善、推广快递服务及衍生产品和服务而使用或授权他人使用该等信息。<br><br>
      <b>5.法律适用</b><br><br>
      本协议适用《中华人民共和国邮政法》、《中华人民共和国合同法》等相关法律法规，未尽事宜按适用法律法规执行。<br><br>
      <b>6.争议解决</b><br><br>
      本协议履行过程中如发生争议，应友好协商解决；如协商不成的，任一方均有权向快件寄出地有管辖权的人民法院提起诉讼。<br><br><br>
      <b>（包装注意事项）</b><br><br>
      <b>1.包装基本常识</b><br><br>
      包装是否符合要求，对保证快件安全、准确、迅速的传递，起着极为重要的作用。尤其是流质和易碎物品，如果包装不妥，不但快件自身容易遭受损毁，而且还会污损其他快件，危及工作人员的安全。判断包装是否牢固，主要要看经过包装后的快件是否能够经受长途运输和正常碰撞、摩擦、震荡、压力以及气候变化，而不致损毁。因此一定要按照物品性质、大小、轻重、寄递路程以及运输情况等，选用适当的包装材料对快件进行妥善包装。<br><br>
      <b>2.包装原则</b><br><br>
      2.1适合运输原则快件包装应坚固、完好，能够防止在运输过程中发生包装破裂、内物漏出、散失；能够防止因摆放、摩擦、震荡或因气压、气温变化而引起快件损毁或者变质；能够防止伤害操作人员或污染运输设备、地面设备及其他物品。<br><br>
      2.2便于装卸原包装材料除应适合快件的性质、状态和重量外，还要整洁、干燥、没有异味和油渍；包装外表面不能有凸出的钉、钩、刺等，要便于搬运、装卸和摆放。<br><br>
      2.3适度包装原则根据快件尺寸、重量和运输特性选择合适大小的外包装及填充物，不足包装和过度包装都不可取。不足包装容易造成快件损毁，过度包装造成包装材料浪费。<br><br>
      <b>3.包装材料的选择</b><br><br>
      3.1纸质类的寄递物品,厚度不超过1cm的纸质物品，使用文件封进行包装；厚度超过1cm且不易破碎、抗压类的书刊、样品等寄递物品，可选择包装袋包装。<br><br>
      3.2质脆易碎物品,如玻璃、光碟、灯饰、陶瓷等,此类快件必须在包装内部的六个面加垫防震材料，且每一件物品单独使用泡沫或其他缓冲材料进行包装。采取多层次包装方法，即快件—衬垫材料—内包装—缓冲材料—运输包装（外包装）。<br><br>
      3.3体积微小的五金配件、纽扣及其他易散落、易丢失的物品，此类快件用塑料袋作为内包装将寄递物品聚集，并严密封口，注意内包装留有适当的空隙。数量较少可使用包装袋作为外包装；数量较大可使用质地坚固、大小适中的纸箱作为外包装，并用填充材料填充箱内的空隙，使得快件在箱内相对固定，避免填充过满而导致内包装破裂引起快件散落丢失。<br><br>
      3.4重量较大的物品，如机器零件、模具、钢（铁）块等，此类快件先使用材质较软的包装材料（如气泡垫等）包裹，然后采用材质较好、耐磨性能好的塑料袋包装，或以材质较好的纸箱包装后并用打包带加固，还可使用木箱进行包装。若快件属易碎品，还须在外包装上加贴易碎标识以作警示。<br><br>
      3.5不规则（异形）、超大、超长的物品此类快件以气泡垫等材质较软的材料进行全部或局部（如两端等易损部位）包装。细长快件还应尽可能捆绑加固，减少中转或运输过程中折损的可能性。但若单件重量已达5kg，则无须将多件捆绑，以利于中转及搬运。若快件为易折损品，应在快件指定位置粘贴易碎标识。<br><br>
      3.6较大的圆柱形或原材料物品（如布匹、皮料、鞋材、泡沫等），此类快件可以先使用透明的塑料薄膜进行包裹，然后再使用胶纸对其进行缠绕包装；严禁使用各种有色的垃圾袋进行包装。<br><br>
      3.7特产类物品，如水果、月饼等，此类快件必须进行保护性包装，具体包装方法可因物而异，以既能防止破损变质，又不污染其他快件为原则，如水果采用条筐、竹笼或者竹篓包装。<br><br>
      3.8液态物品的包装（仅限全程陆路运输的非危险性物品，容器内部必须留有5%-10%的空隙，封盖必须严密，不得溢漏。若是用玻璃容器盛装的液体，则每一容器的容量不宜超过500ml。若容器本身的强度较小，则必须采用纸箱或木箱对快件进行加固包装，且箱内应使用缓冲材料填实，防止晃动或倒置搬运液体渗出污染其他快件，并在外包装上粘贴易碎标识。<br><br>
      3.9轴承内钢珠等会渗油的固体物品，此类快件必须满足液体类物品的包装要求，应使用衬垫和吸附材料填实，防止在运输过程因渗漏而污染本身运单及其他快件。 粉状物品（难以辨认成分的白色粉状物品及进出口件除外，若快件的原包装是塑料袋包装的，还应使用塑料涂膜编织袋作外包装，保证粉末不致漏出。单件快件毛重不宜超过50kg.若快件的原包装是用硬纸桶、木桶、胶合板桶盛装的，要求桶身不破、接缝严密、桶盖密封、桶箍坚固结实，桶身两端应有钢带打包带。若快件的原包装是用玻璃器皿包装的，每瓶内装物的重量不宜超过1kg。如容器本身的强度不够，则须用铁制或木制材料作外包装，且箱内应用缓冲材料填实。单件快件毛重以不超过25kg为宜。<br><br>
      3.10纺织类物品，此类快件可采用布袋、麻袋、纸箱包装。布袋的材料应选用坚固结实的棉布；麻袋的坯布应无破洞，具有一定强度，封口处应用封口机一次性封口。 若使用纸箱包装，必须对箱角及边缘用胶纸加固，确保其不会在运输过程中破裂。凡纸箱任何一边超过60cm，还需用打包带加固。若纸箱质量较差，还可在其外面套编织袋，以防止在搬运、装卸过程中造成部分遗失或损毁。<br><br>
      3.11精密仪器及电子产品类物品，此类快件应采用纸箱或全木箱包装，快件与箱壁应预留2cm的空隙，用缓冲材料填充。若使用纸箱包装，在检查完寄递物品后，如外包装有旧的快递运输或包装标识，须将其清除；如无法清除干净的，在体积允许的情况下，应将纸箱装入包装袋，或用包装箱重新进行包装，以避免旧的快件标识造成操作失误。 对于可以收寄的自身带电的电子类寄递物品，必须在征得寄件人同意的情况下将寄递物品自带的电池拆卸并与主体分离后方可收取；对于无法拆卸分离的快件不予收取，并向寄件人做好解释工作。<br><br>
      3.12胶纸中使用最多的是透明胶纸，用于对所收寄件人的寄递物品进行封固包装。除文件封和各款包装袋以外，其他类型包装的快件一般都需要用胶纸进行封固包装。对于外形规则类纸箱包装的快件，要求使用胶纸对纸箱上下表面进行“├┤”字形包装操作。<br><br>
      3.13使用透明胶纸沿着纸箱的中缝部位进行封粘，同时胶纸两端应延纸箱两侧面放宽5-10cm，以便将纸箱的中缝两端开口处覆盖，同时做到压紧胶纸两端，使得胶纸和箱体充分粘合。 使用透明胶纸分别对纸箱的两侧缝口进行封粘。封粘要求先对纸箱一侧的侧缝开口进行封粘，同样胶纸应延长放宽5-10cm，同时做到压紧胶纸两端和胶纸中间部位，使用胶纸和箱体充分粘合。 在完成纸箱一表面的“├┤”行包装后，还需对另一表面进行封粘。<br><br>
      <b>4.快件包装注意事项</b><br><br>
      4.1禁止使用一切报刊类物品作为快件的外包装，如报纸、海报、书刊、杂志等；严禁使用各种有色垃圾袋和容易破损、较薄的类似垃圾袋的包装物。<br><br>
      4.2对于价值较高的快件采用包装箱进行包装，包装时应使用缓冲材料。<br><br>
      4.3对于一票多件的快件，如果是国际快件，因海关严禁寄递物品多件捆扎寄递，所以必须按照一票多件操作规范进行操作。如果是国内互寄快件，单票重量不超1kg,且每件快件外包装形状相同，体积最大的快件一侧面积小于运单的，可以多件捆扎寄递，但同时必须在连体快件上批注运单号码，并将连体快件捆扎牢固。凡是两件或两件以上合装的快件，必须要用打包带加固。例如有三个同规格鞋盒子一起寄递时，可将三个盒子进行捆扎牢固，作为一票快件寄递。<br><br>
      4.4对于重复利用的旧包装材料，均必须清除原有运单及其他特殊的快件标记后方可使用，以避免因旧包装内容而影响快件的流转。<br><br>
      <b>5.处理场地快件包装破损及不合格包装的常见情况</b><br><br>
      5.1包装箱有2cm以上的破洞或有明显的撕裂，快件内件容易脱落或被损毁。<br><br>
      5.2快件的包装箱有水湿、油污现象。 外包装箱被压垮、折断，如纸箱包装的家用电器（零部件）的快件经常发生包装被压垮、折断。<br><br>
      5.3在搬运过程中，虽外包装完好，但能感觉到快件内容品之间有摩擦、碰撞，并伴有碰撞音或有异常已破坏的声音。<br><br>
      5.4快件外包装未损毁，但有异常的气味或强烈的刺激气味。 快件外包装为已使用过的旧包装物，表面留有旧运单、标签、地址等，或旧运单、标签、地址去除得不彻底。<br><br>
      5.5快件的外包装为海报或塑料等易破损包装物。<br><br>
      <b>6.包装的注意事项示例</b><br><br>
      6.1绳索、带子，对于使用绳索或带子捆扎施封的包装，必须去除这些绳索或带子，使用胶带进行封箱。<br><br>
      6.2胶带，对于使用玻璃纸胶带、医用胶布施封的包装，应去除该施封胶带并使用专用胶带进行封箱。<br><br>
      6.3使用过的箱体，使用有压垮痕迹、有破洞及有油渍、水渍的使用过的箱子对保价标的物进行包装，应将其保价标的物或连同箱子一起置入合格之外包装内；对于可接受的使用过的包装，必须去除包装外侧所有标签、号码、地址信息及一切有可能影响操作人员识别的粘贴物品和信息。<br><br>
      6.4易破损材料，对于使用易破损材料作为外包装的保价标的物，如保丽龙箱、塑料等，应将其置入合格之外包装内。<br><br>
      6.5内件保护，收到包装好的物品时，稍加晃动，如能听到内件发出相互碰撞之声音，应向寄件人提出检查包裹要求，并建议寄件人使用足够的填充物，以适合长途转运操作，避免内容物相互碰撞破损。<br><br>
      6.6易碎物品，对于瓷器和玻璃制品，必须在包装内部六个面加垫防震材料，且箱体内每一件瓷器或玻璃制品必须单独使用泡沫或其他材料进行包装。<br><br>
      6.7小件物品，大量小件内容物零散至于包裹中，如螺栓、螺钉、螺母、钉子等物品，必须以麻布袋包裹后，再置入合格之外包装中。<br><br>
    </el-drawer>
  </div>
</template>

<script>
  import { regionData, CodeToText } from 'element-china-area-data'
  import Constant from "../pub/Constant"
	export default {
		name: "UserSend",
    data() {
      return {
        baseUrl: Constant.data.baseUrl,
        form: {
          admin: '',
          name: '',
          phone: '',
          addr: [],
          info: '',
          weight: 1,
          hasPack: false,
          isRead: false,
          price: 0
        },
        region: regionData,
        rules: {
          admin: [
            { required: true, message: '请选择驿站!', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入收件人姓名!', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入收件人联系方式!', trigger: 'blur' },
            { min: 8, max: 11, message: '请正确输入手机号!', trigger: 'blur' }
          ],
          addr: [
            { required: true, message: '请选择收件人地址!', trigger: 'blur' }
          ],
          info: [
            { required: true, message: '请选择物品信息!', trigger: 'blur' }
          ]
        },
        price: {
          base: 0,
          continue: 0
        },
        priceTable: false,
        prohibitDrawer: false,
        protocolDrawer: false,
        priceData: [
          { province: '江苏', code: '310000', base: 5, continue: 1},
          { province: '上海', code: '320000', base: 5, continue: 1},
          { province: '浙江', code: '330000', base: 5, continue: 1},
          { province: '安徽', code: '340000', base: 10, continue: 8},
          { province: '北京', code: '110000', base: 13, continue: 10},
          { province: '天津', code: '120000', base: 13, continue: 10},
          { province: '河北', code: '130000', base: 13, continue: 10},
          { province: '山西', code: '140000', base: 13, continue: 10},
          { province: '吉林', code: '220000', base: 13, continue: 10},
          { province: '福建', code: '350000', base: 13, continue: 10},
          { province: '江西', code: '360000', base: 13, continue: 10},
          { province: '山东', code: '370000', base: 13, continue: 10},
          { province: '河南', code: '410000', base: 13, continue: 10},
          { province: '湖北', code: '420000', base: 13, continue: 10},
          { province: '湖南', code: '430000', base: 13, continue: 10},
          { province: '广东', code: '440000', base: 13, continue: 10},
          { province: '重庆', code: '500000', base: 13, continue: 10},
          { province: '四川', code: '510000', base: 13, continue: 10},
          { province: '贵州', code: '520000', base: 13, continue: 10},
          { province: '云南', code: '530000', base: 13, continue: 10},
          { province: '内蒙', code: '150000', base: 15, continue: 10},
          { province: '辽宁', code: '210000', base: 15, continue: 10},
          { province: '黑龙', code: '230000', base: 15, continue: 10},
          { province: '广西', code: '450000', base: 15, continue: 10},
          { province: '海南', code: '460000', base: 15, continue: 10},
          { province: '陕西', code: '610000', base: 15, continue: 10},
          { province: '甘肃', code: '620000', base: 15, continue: 10},
          { province: '青海', code: '630000', base: 15, continue: 10},
          { province: '宁夏', code: '640000', base: 15, continue: 10},
          { province: '新疆', code: '650000', base: 15, continue: 10},
          { province: '西藏', code: '540000', base: 0, continue: 0},
          { province: '台湾', code: '710000', base: 0, continue: 0},
          { province: '香港', code: '810000', base: 0, continue: 0},
          { province: '澳门', code: '820000', base: 0, continue: 0}
        ],
        priceDataTitle: '计费方式（以下区域码数据来自 airyland/china-area-data）',
        prohibitDrawerTitle: '禁寄物品',
        protocolDrawerTitle: '寄件服务协议'
      }
    },
    methods: {
		  // 寄件提交
      onSubmit(formName) {
        const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (_this.form.addr[0] === '540000' || _this.form.addr[0] === '710000' ||
              _this.form.addr[0] === '810000' || _this.form.addr[0] === '820000' ||
              _this.form.addr[0] === '') {
              _this.$message({
                showClose: true,
                message: '警告哦，无法寄到该收件地址！',
                type: 'warning'
              })
            } else {
              let token = sessionStorage.getItem('token')
              let addr = CodeToText[_this.form.addr[0]] + CodeToText[_this.form.addr[1]] + CodeToText[_this.form.addr[2]]
              _this.$axios({
                method: 'post',
                url: _this.baseUrl + '/send/getSendInfo',
                data: {
                  admin: _this.form.admin,
                  name: _this.form.name,
                  phone: _this.form.phone,
                  addr: addr,
                  info: _this.form.info,
                  weight: _this.form.weight,
                  price: _this.form.price,
                  token: token
                }
              })
                .then(function (response) {
                  // console.log(response.data)
                  if (response.data.result === 'do success') {
                    _this.$message({
                      showClose: true,
                      message: '下单成功，请等待驿站管理员确认！',
                      type: 'success'
                    })
                    let NewPage = "_empty" + "?time=" + new Date().getTime() / 500
                    _this.$router.push(NewPage)
                    _this.$router.go(-1)
                  } else if (response.data.result === 'do fail') {
                    _this.$notify({
                      showClose: true,
                      title: '警告',
                      message: '寄件下单失败！',
                      type: 'warning'
                    })
                  } else if (response.data.result === 'please login to operate') {
                    _this.$notify({
                      showClose: true,
                      title: '警告',
                      message: '请在登录状态操作',
                      type: 'warning'
                    })
                    _this.$router.push('/LoginAndRegister')
                  }
                })
                .catch(function (error) {
                  // console.log(error)
                  _this.$notify.error({
                    showClose: true,
                    title: '错误',
                    message: '服务器出错啦！'
                  })
                })
            }
          } else {
            // console.log('error submit!!')
            _this.$message({
              showClose: true,
              message: '警告哦，请完成寄件信息填写！',
              type: 'warning'
            })
            return false
          }
        })
      },
      // 重量处理
      handleChangeWeight(value) {
        // console.log(value)
      },
      // 选择省市区处理
      handleChangeCity(value) {
        // console.log(CodeToText[value[0]])       // 省
        // console.log(CodeToText[value[1]])       // 市
        // console.log(CodeToText[value[2]])       // 区
      },
      // 运费处理
      setPrice() {
        const _this = this
        if (_this.form.addr[0] === '310000' || _this.form.addr[0] === '320000' || _this.form.addr[0] === '330000') {
          _this.form.price = 4 + _this.form.weight
          _this.price.base = 5
          _this.price.weight = 1
        } else if (_this.form.addr[0] === '110000' || _this.form.addr[0] === '120000' || _this.form.addr[0] === '130000'
          || _this.form.addr[0] === '140000' || _this.form.addr[0] === '220000' || _this.form.addr[0] === '350000'
          || _this.form.addr[0] === '360000' || _this.form.addr[0] === '370000' || _this.form.addr[0] === '410000'
          || _this.form.addr[0] === '420000' || _this.form.addr[0] === '430000' || _this.form.addr[0] === '440000'
          || _this.form.addr[0] === '500000' || _this.form.addr[0] === '410000' || _this.form.addr[0] === '510000'
          || _this.form.addr[0] === '520000' || _this.form.addr[0] === '530000') {
          _this.form.price = 3 + 10 * _this.form.weight
          _this.price.base = 13
          _this.price.weight = 10
        } else if (_this.form.addr[0] === '540000' || _this.form.addr[0] === '710000' || _this.form.addr[0] === '810000' ||
          _this.form.addr[0] === '820000') {
          _this.form.price = 0
          _this.price.base = 0
          _this.price.weight = 0
        } else if (_this.form.addr[0] === '340000') {
          _this.form.price = 2 + 8 * _this.form.weight
          _this.price.base = 10
          _this.price.weight = 8
        } else if (_this.form.addr[0] === '150000' || _this.form.addr[0] === '210000' || _this.form.addr[0] === '230000'
          || _this.form.addr[0] === '450000' || _this.form.addr[0] === '460000' || _this.form.addr[0] === '610000'
          || _this.form.addr[0] === '620000' || _this.form.addr[0] === '630000' || _this.form.addr[0] === '640000'
          || _this.form.addr[0] === '650000') {
          _this.form.price = 5 + 10 * _this.form.weight
          _this.price.base = 15
          _this.price.weight = 10
        }
      },
      // 查看运费明细
      clickPrice() {
        const _this = this
        this.$msgbox({
          title: '运费明细',
          message: '<strong>首重价格：</strong>￥' + _this.price.base
            + '<br><strong>续重价格：</strong>￥' + _this.price.continue
            + '/kg<br><strong>运费总价：</strong>￥' + _this.form.price,
          dangerouslyUseHTMLString: true,
          center: true
        })
      },
		},
    updated() {
		  this.setPrice()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

  /* el-drawer 内部添加滚动条 */
  .el-drawer.rtl {
    overflow: scroll;
  }

  /*.el-input__inner {*/
  /*  width: 300px;*/
  /*}*/
</style>
