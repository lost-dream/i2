<template>
  <div class="timespaceinfo">
    <div class="seatInfoCoat1">
      <div class="seatInfoCoat2">
        <div class="seatInfoCoat3">
          <div class="seatInfo">
            <div
              v-if="type === 'lg' || type === 'wb'"
              class="journeyInfo clearfix"
            >
              <div class="infoItem" style="width: 100%;height: auto!important;">
                <span
                  style="text-align: initial;padding: 0 30px;height: auto;font-size: 18px;"
                >
                  {{ type === 'lg' ? '旅馆名称：' : '网吧名称：' }}
                  {{ userData.name }}
                </span>
              </div>
            </div>
            <div v-else class="journeyInfo clearfix">
              <div class="infoItem" style="width: 20%">
                <span
                  class="icon-zdy-feiji"
                  :style="iconStyle"
                  v-if="userData.typeCode === '飞机'"
                ></span>
                <span
                  class="icon-zdy-huoche"
                  :style="iconStyle"
                  v-else-if="userData.typeCode === '火车'"
                ></span>
                <span
                  class="icon-zdy-daba"
                  :style="iconStyle"
                  v-else-if="userData.typeCode === '汽车'"
                ></span>
                <span style="font-size: 14px"
                  >&nbsp;{{ userData.typeCode }}出行信息</span
                >
              </div>
              <div class="infoItem" style="width: 30%">
                <span style="font-size: 18px">
                  {{ userData.startSstation }} -
                  {{ userData.destination }}
                </span>
                <span class="el-icon-time"
                  >&nbsp;&nbsp;{{ userData.startTime }}</span
                >
              </div>
              <div class="infoItem" style="width: 25%">
                <span class="icon-zdy-facheshikebiao"
                  >&nbsp;&nbsp;{{ userData.toolNumber }}次</span
                >
              </div>
            </div>
            <div v-if="type === 'lg'" class="seatDesc clearfix">
              <div class="infoItem2" style="width: 40%">
                <span style="font-size: 14px">
                  {{ userData.checkIn | formatHotelDate }} -
                  {{ userData.checkOut | formatHotelDate }}
                </span>
              </div>
              <div class="infoItem2" style="width: 20%">
                <span>
                  <span class="icon-zdy-yizi noOne"></span>&emsp;无住户
                </span>
              </div>
              <div class="infoItem2" style="width: 20%">
                <span>
                  <span class="icon-zdy-yizi exist"></span>&emsp;已有住户
                </span>
              </div>
              <div class="infoItem2" style="width: 20%">
                <span>
                  <span class="icon-zdy-yizi parties"></span>&emsp;当事人
                </span>
              </div>
            </div>
            <div v-else-if="type === 'wb'" class="seatDesc clearfix">
              <div class="infoItem2" style="width: 40%">
                <span style="font-size: 14px">
                  {{ userData.checkIn }} - {{ userData.checkOut }}
                </span>
              </div>
              <div class="infoItem2" style="width: 20%">
                <span>
                  <span class="icon-zdy-yizi noOne"></span>
                  &nbsp;&nbsp;无人
                </span>
              </div>
              <div class="infoItem2" style="width: 20%">
                <span>
                  <span class="icon-zdy-yizi exist"></span>&nbsp;&nbsp;有人
                </span>
              </div>
              <div class="infoItem2" style="width: 20%">
                <span>
                  <span class="icon-zdy-yizi parties"></span>&nbsp;&nbsp;当事人
                </span>
              </div>
            </div>
            <div v-else class="seatDesc clearfix">
              <div class="infoItem2" style="width: 40%;font-size: 14px;">
                <span v-if="userData.typeCode === '飞机'">
                  &emsp;第{{ userData.cabinPlace }}机舱
                </span>
                <span v-else-if="userData.typeCode === '火车'">
                  &emsp;第{{ userData.carriageNumber }}
                </span>
                <span v-else-if="userData.typeCode === '汽车'">
                  &emsp;{{ userData.carNo }}
                </span>
              </div>
              <div class="infoItem2" style="width: 20%">
                <span>
                  <span class="icon-zdy-yizi noOne"></span>
                  &nbsp;&nbsp;无乘客
                </span>
              </div>
              <div class="infoItem2" style="width: 20%">
                <span>
                  <span class="icon-zdy-yizi exist"></span>&nbsp;&nbsp;固定乘客
                </span>
              </div>
              <div class="infoItem2" style="width: 20%">
                <span>
                  <span class="icon-zdy-yizi parties"></span>&nbsp;&nbsp;当事人
                </span>
              </div>
            </div>
            <!-- 座位图 -->
            <div class="seatLayout">
              <div v-if="type === 'hc'" class="hc_seatLayout">
                <div class="columnName clearfix">
                  <div class="list">
                    <span></span>
                  </div>
                  <div class="list">
                    <span>A</span>
                  </div>
                  <div class="list">
                    <span>B</span>
                  </div>
                  <div class="list">
                    <span>C</span>
                  </div>
                  <div class="list aisle">
                    <span>过道</span>
                  </div>
                  <div class="list">
                    <span>D</span>
                  </div>
                  <div class="list">
                    <span>F</span>
                  </div>
                </div>
                <div
                  class="seatList clearfix"
                  @click.stop
                  v-if="seatLine.length === 1"
                >
                  <div class="list">
                    <span>{{ seatLine[0] }}</span>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="seatLine[0] + 'A'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showHCInfo(seatLine[0], 'A')"
                        :class="addHCClass(seatLine[0], 'A')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="seatLine[0] + 'B'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showHCInfo(seatLine[0], 'B')"
                        :class="addHCClass(seatLine[0], 'B')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list aisle">
                    <span></span>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="seatLine[0] + 'C'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showHCInfo(seatLine[0], 'C')"
                        :class="addHCClass(seatLine[0], 'C')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="seatLine[0] + 'D'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showHCInfo(seatLine[0], 'D')"
                        :class="addHCClass(seatLine[0], 'D')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="seatLine[0] + 'F'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showHCInfo(seatLine[0], 'F')"
                        :class="addHCClass(seatLine[0], 'F')"
                      ></span>
                    </el-tooltip>
                  </div>
                </div>
                <div
                  class="seatList clearfix"
                  v-else-if="seatLine.length > 1"
                  @click.stop
                  v-for="(item, index) in seatLine[seatLine.length - 1] -
                    seatLine[0] +
                    1"
                  :key="index"
                >
                  <div class="list">
                    <span>{{ item + seatLine[0] - 1 }}</span>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + seatLine[0] - 1 + 'A'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showHCInfo(item + seatLine[0] - 1, 'A')"
                        :class="addHCClass(item + seatLine[0] - 1, 'A')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + seatLine[0] - 1 + 'B'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item + seatLine[0] - 1, 'B')"
                        :class="addHCClass(item + seatLine[0] - 1, 'B')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + seatLine[0] - 1 + 'C'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item + seatLine[0] - 1, 'C')"
                        :class="addHCClass(item + seatLine[0] - 1, 'C')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list aisle">
                    <span></span>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + seatLine[0] - 1 + 'D'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item + seatLine[0] - 1, 'D')"
                        :class="addHCClass(item + seatLine[0] - 1, 'D')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + seatLine[0] - 1 + 'F'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item + seatLine[0] - 1, 'F')"
                        :class="addHCClass(item + seatLine[0] - 1, 'F')"
                      ></span>
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <div v-else-if="type === 'fj'" class="fj_seatLayout">
                <div class="columnName clearfix">
                  <div class="list">
                    <span></span>
                  </div>
                  <div class="list">
                    <span>A</span>
                  </div>
                  <div class="list">
                    <span>C</span>
                  </div>
                  <div class="list aisle">
                    <span>过道</span>
                  </div>
                  <div class="list">
                    <span>D</span>
                  </div>
                  <div class="list">
                    <span>E</span>
                  </div>
                  <div class="list">
                    <span>F</span>
                  </div>
                  <div class="list">
                    <span>G</span>
                  </div>
                  <div class="list aisle">
                    <span>过道</span>
                  </div>
                  <div class="list">
                    <span>H</span>
                  </div>
                  <div class="list">
                    <span>K</span>
                  </div>
                </div>
                <div
                  class="seatList clearfix"
                  @click.stop
                  v-if="seatLine.length === 1"
                >
                  <div class="list">
                    <span>{{ seatLine[0] }}</span>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="seatLine[0] + 'A'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(seatLine[0], 'A')"
                        :class="addFJClass(seatLine[0], 'A')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="seatLine[0] + 'C'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(seatLine[0], 'C')"
                        :class="addFJClass(seatLine[0], 'C')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list aisle">
                    <span></span>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="seatLine[0] + 'D'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(seatLine[0], 'D')"
                        :class="addFJClass(seatLine[0], 'D')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="seatLine[0] + 'E'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(seatLine[0], 'E')"
                        :class="addFJClass(seatLine[0], 'E')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="seatLine[0] + 'F'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(seatLine[0], 'F')"
                        :class="addFJClass(seatLine[0], 'F')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + 'G'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item, 'G')"
                        :class="addFJClass(item, 'G')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list aisle">
                    <span></span>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + 'H'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item, 'H')"
                        :class="addFJClass(item, 'H')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + 'K'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item, 'K')"
                        :class="addFJClass(item, 'K')"
                      ></span>
                    </el-tooltip>
                  </div>
                </div>
                <div
                  class="seatList clearfix"
                  v-else-if="seatLine.length > 1"
                  @click.stop
                  v-for="(item, index) in seatLine[seatLine.length - 1] -
                    seatLine[0] +
                    1"
                  :key="index"
                >
                  <div class="list">
                    <span>{{ item + seatLine[0] - 1 }}</span>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + seatLine[0] - 1 + 'A'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item + seatLine[0] - 1, 'A')"
                        :class="addFJClass(item + seatLine[0] - 1, 'A')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + seatLine[0] - 1 + 'C'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item + seatLine[0] - 1, 'C')"
                        :class="addFJClass(item + seatLine[0] - 1, 'C')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list aisle">
                    <span></span>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + seatLine[0] - 1 + 'D'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item + seatLine[0] - 1, 'D')"
                        :class="addFJClass(item + seatLine[0] - 1, 'D')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + seatLine[0] - 1 + 'E'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item + seatLine[0] - 1, 'E')"
                        :class="addFJClass(item + seatLine[0] - 1, 'E')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + seatLine[0] - 1 + 'F'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item + seatLine[0] - 1, 'F')"
                        :class="addFJClass(item + seatLine[0] - 1, 'F')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + 'G'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item + seatLine[0] - 1, 'G')"
                        :class="addFJClass(item + seatLine[0] - 1, 'G')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list aisle">
                    <span></span>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + seatLine[0] - 1 + 'H'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item + seatLine[0] - 1, 'H')"
                        :class="addFJClass(item + seatLine[0] - 1, 'H')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + seatLine[0] - 1 + 'K'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item + seatLine[0] - 1, 'K')"
                        :class="addFJClass(item + seatLine[0] - 1, 'K')"
                      ></span>
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <div v-else-if="type === 'qc'" class="qc_seatLayout">
                <div class="columnName clearfix">
                  <div class="list">
                    <span></span>
                  </div>
                  <div class="list">
                    <span>A</span>
                  </div>
                  <div class="list">
                    <span>B</span>
                  </div>
                  <div class="list aisle">
                    <span>过道</span>
                  </div>
                  <div class="list">
                    <span>C</span>
                  </div>
                  <div class="list">
                    <span>D</span>
                  </div>
                </div>
                <div
                  class="seatList clearfix"
                  @click.stop
                  v-for="(item, index) in 11"
                  :key="index"
                >
                  <div class="list">
                    <span>{{ item }}</span>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="(item - 1) * 4 + 1 + ''"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showQcInfo((item - 1) * 4 + 1)"
                        :class="addQCClass((item - 1) * 4 + 1)"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="(item - 1) * 4 + 2 + ''"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showQcInfo((item - 1) * 4 + 2)"
                        :class="addQCClass((item - 1) * 4 + 2)"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list aisle" v-if="item !== 11">
                    <span></span>
                  </div>
                  <div class="list aisle" v-else>
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="(item - 1) * 4 + 3 + ''"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showQcInfo((item - 1) * 4 + 3)"
                        :class="addQCClass((item - 1) * 4 + 3)"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="
                        item !== 11
                          ? (item - 1) * 4 + 3 + ''
                          : (item - 1) * 4 + 4 + ''
                      "
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="
                          showQcInfo(
                            item !== 11
                              ? (item - 1) * 4 + 3
                              : (item - 1) * 4 + 4,
                          )
                        "
                        :class="
                          addQCClass(
                            item !== 11
                              ? (item - 1) * 4 + 3
                              : (item - 1) * 4 + 4,
                          )
                        "
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="
                        item !== 11
                          ? (item - 1) * 4 + 4 + ''
                          : (item - 1) * 4 + 5 + ''
                      "
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="
                          showQcInfo(
                            item !== 11
                              ? (item - 1) * 4 + 4
                              : (item - 1) * 4 + 5,
                          )
                        "
                        :class="
                          addQCClass(
                            item !== 11
                              ? (item - 1) * 4 + 4
                              : (item - 1) * 4 + 5,
                          )
                        "
                      ></span>
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <div v-else-if="type === 'lg'" class="lg_seatLayout">
                <div
                  class="seatList clearfix"
                  v-if="floors.length > 0"
                  @click.stop
                >
                  <template
                    v-for="(item, index) in floors[floors.length - 1] -
                      floors[0] +
                      1"
                  >
                    <section :key="index">
                      <div class="list" style="height: 100px">
                        <span>{{ item + floors[0] - 1 }}F</span>
                      </div>
                      <div
                        class="list lgList"
                        v-for="(item2, index2) in 26"
                        :key="index2"
                      >
                        <el-tooltip
                          popper-class="atooltip"
                          class="item"
                          effect="dark"
                          :content="
                            item2 >= 10
                              ? `${item + floors[0] - 1}${item2}房间`
                              : `${item + floors[0] - 1}0${item2}房间`
                          "
                          placement="top"
                        >
                          <span
                            class="icon-zdy-yizi"
                            @click="showLgInfo(item + floors[0] - 1, item2)"
                            :class="addLGClass(item + floors[0] - 1, item2)"
                          ></span>
                        </el-tooltip>
                      </div>
                    </section>
                  </template>
                </div>
              </div>
              <div v-else-if="type === 'wb'" class="wb_seatLayout">
                <div
                  class="seatList clearfix"
                  @click.stop
                  v-for="(item, index) in 5"
                  :key="index"
                >
                  <div class="list" style="height: 100px">
                    <span>{{ wbArea(item) }}&nbsp;区域</span>
                  </div>
                  <div
                    class="list lgList"
                    v-for="(item2, index2) in 26"
                    :key="index2"
                  >
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :style="{
                        display: 'block !important',
                        width: '100%',
                        height: '100%',
                      }"
                      :content="item2 + (item - 1) * 26 + '号机'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showWbInfo(item2 + (item - 1) * 26)"
                        :class="addWBClass(item2 + (item - 1) * 26)"
                      ></span>
                    </el-tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="passengerInfo" class="passengerInfo" v-show="passengerInfoShow">
      <div v-if="personCard.length > 1">
        <span
          v-for="(item, index) in personCard.length"
          :key="index"
          @click="okCard = item"
        >
          <span
            :class="{ okCard: okCard === item }"
            class="cardList"
            @click="changeMember(index)"
          >
            旅客{{ item }}
          </span>
        </span>
      </div>
      <personal-info-card
        :IDNum="showPassenger.idNnumber || showPassenger.idNumber"
        :name="showPassenger.userName || showPassenger.name"
        :nationality="showPassenger.nation"
        :sex="showPassenger.sex"
        :birthday="showPassenger.birthday"
        :mobile="showPassenger.cellphone"
        :addr="showPassenger.currentAddress"
        @addToRelationAnalysis="addToRelationAnalysis(showPassenger)"
      />
    </div>
  </div>
</template>

<script>
import personalInfoCard from '@/views/common/personalInfoCard'
import Cookies from 'js-cookie'
import { analyzedetailsApi } from '@/api/timespace'

export default {
  name: 'timespaceinfo',
  components: {
    personalInfoCard,
  },
  data() {
    return {
      passengerInfoShow: false,
      okCard: 1,
      personCard: [],
      type: this.$route.query.type, // 显示的详情类型
      userData: JSON.parse(Cookies.get('shikong_data')),
      iconStyle: {
        // icon样式
        fontSize: '40px',
        overflow: 'inherit',
        padding: '10px 0',
      },
      seatLine: [], // 座位号行数的限制 eg: [20, 30] => 最小20行最大30行
      seats: [], // 所有的座位号
      passengers: [], // 所有乘客名单
      showPassenger: [], // 点击查看的乘客名单
      floors: [], // 旅馆所有的楼层
      hotelRooms: [], // 旅馆所有住了人的房间数
      hotelMember: {}, // 旅馆所有住户数据整合
      roomMebers: [], // 某个房间所有人的集合
    }
  },
  computed: {
    wbArea(x) {
      return x => {
        let a = [
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z',
        ]
        return a[x - 1]
      }
    },
  },
  filters: {
    formatHotelDate(value) {
      const dateArr = value.split('-')
      return `${dateArr[0]}年${dateArr[1]}月${dateArr[2]}日`
    },
  },
  methods: {
    // 判断位置有没有乘客，添加对应的座位图标className
    addHCClass(x, y) {
      x = (x + '').length === 1 ? '0' + x : x
      return this.seats.map(value => {
        if (y === 'F' || y === 'E') {
          if (x - 0 === parseInt(this.userData.seatNumber)) {
            return 'parties'
          } else if (value === x + y) {
            return 'exist'
          } else {
            return 'noOne'
          }
        } else {
          if (x + y === this.userData.seatNumber) {
            return 'parties'
          } else if (value === x + y) {
            return 'exist'
          } else {
            return 'noOne'
          }
        }
      })
    },
    addFJClass(x, y) {
      x = (x + '').length === 1 ? '0' + x : x
      return this.seats.map(value => {
        if (x + y === this.userData.seatNumber) {
          return 'parties'
        } else if (value === x + y) {
          return 'exist'
        } else {
          return 'noOne'
        }
      })
    },
    addQCClass(num) {
      return this.seats.map(value => {
        if (num - 0 === this.userData.seatNumber - 0) {
          return 'parties'
        } else if (num - 0 === value - 0) {
          return 'exist'
        } else {
          return 'noOne'
        }
      })
    },
    addLGClass(x, y) {
      y = y.toString().length === 1 ? '0' + y : y.toString()
      return this.passengers.map(value => {
        if (x + y - 0 === this.userData.roomNo - 0) {
          return 'parties'
        } else if (value.roomNo - 0 === x + y - 0) {
          return 'exist'
        } else {
          return 'noOne'
        }
      })
    },
    addWBClass(num) {
      return this.seats.map(value => {
        if (num - 0 === this.userData.computerNo - 0) {
          return 'parties'
        } else if (num - 0 === value - 0) {
          return 'exist'
        } else {
          return 'noOne'
        }
      })
    },
    // 显示飞机座位乘客信息 x,y为座位信息
    showInfo(x, y) {
      x = (x + '').length === 1 ? '0' + x : x
      this.seats.map((value, index) => {
        if (value === x + y) {
          this.personCard = [1]
          this.showPassenger = this.passengers[index].crewEntity
          this.passengerInfoShow = true
        } else {
          // this.$message.error('该位置无乘客')
        }
      })
    },
    showHCInfo(x, y) {
      x = (x + '').length === 1 ? '0' + x : x
      this.seats.map((value, index) => {
        if (y === 'E' || y === 'F') {
          if (parseInt(value) === x - 0) {
            this.personCard = [1]
            this.showPassenger = this.passengers[index].crewEntity
            this.passengerInfoShow = true
          }
        } else {
          if (value === x + y) {
            this.personCard = [1]
            this.showPassenger = this.passengers[index].crewEntity
            this.passengerInfoShow = true
          } else {
            // this.$message.error('该位置无乘客')
          }
        }
      })
    },
    // 显示汽车座位乘客信息 x为座位信息
    showQcInfo(x) {
      this.seats.map((value, index) => {
        if (value - 0 === x - 0) {
          this.personCard = [1]
          this.showPassenger = this.passengers[index].crewEntity
          this.passengerInfoShow = true
        } else {
          // this.$message.error('该位置无乘客')
        }
      })
    },
    // 显示旅馆房间人员信息 x,y为房间坐标
    showLgInfo(x, y) {
      y = (y + '').length === 1 ? '0' + y : y
      this.hotelRooms.map(value => {
        if (value + '' === '' + x + y) {
          const roomData = this.hotelMember[value]
          let arr = []
          roomData.map((value, index) => {
            arr.push(index)
          })
          this.personCard = arr
          this.roomMebers = roomData
          this.showPassenger = roomData[0]
          this.passengerInfoShow = true
        }
      })
    },
    // 显示网吧人员信息 x为机号
    showWbInfo(x) {
      this.seats.map((value, index) => {
        if (value - 0 === x - 0) {
          this.personCard = [1]
          this.showPassenger = this.passengers[index]
          this.passengerInfoShow = true
        } else {
          // this.$message.error('该位置无乘客')
        }
      })
    },
    changeMember(index) {
      this.showPassenger = this.roomMebers[index]
    },
    addToRelationAnalysis(userData) {
      let relationType
      switch (this.type) {
        case 'lg': // 旅馆
          relationType = 'SameHotel'
          break
        case 'hc': // 火车
          relationType = 'SameTrain'
          break
        case 'fj': // 飞机
          relationType = 'SamePlane'
          break
        case 'qc': // 汽车
          relationType = 'SameCoach'
          break
        case 'wb': // 网吧
          relationType = 'SameInternetCafe'
          break
      }
      const keyword = userData.idNnumber || userData.idNumber
      this.$router.push({
        name: 'analyse',
        query: {
          keyword,
          relationType: [relationType],
        },
      })
    },
  },
  mounted() {
    // 点击空白地方隐藏乘客信息
    document.addEventListener('click', e => {
      if (this.passengerInfoShow) {
        let $passengerInfo = document.getElementById('passengerInfo')
        if (!$passengerInfo.contains(e.target)) {
          this.passengerInfoShow = false
        }
      }
    })

    let data = {}
    switch (this.userData.typeCode) {
      case '飞机':
        data = {
          destination: this.userData.destination,
          startSstation: this.userData.startSstation,
          startTime: this.userData.startTime,
          toolNumber: this.userData.toolNumber,
          fcNumber: this.userData.cabinPlace,
          type: 1,
        }
        break
      case '火车':
        data = {
          destination: this.userData.destination,
          startSstation: this.userData.startSstation,
          startTime: this.userData.startTime,
          toolNumber: this.userData.toolNumber,
          fcNumber: this.userData.carriageNumber,
          type: 2,
        }
        break
      case '汽车':
        data = {
          destination: this.userData.destination,
          startSstation: this.userData.startSstation,
          startTime: this.userData.startTime,
          toolNumber: this.userData.toolNumber,
          type: 3,
        }
        break
      case '网吧':
        data = {
          beginTime: this.userData.checkIn,
          endTime: this.userData.checkOut,
          wbAndbgNameId: this.userData.id,
          type: 4,
        }
        break
      case '旅馆':
        data = {
          beginTime: this.userData.checkIn,
          endTime: this.userData.checkOut,
          wbAndbgNameId: this.userData.id,
          type: 5,
        }
        break
    }

    analyzedetailsApi(data).then(({ data }) => {
      if (data && parseInt(data.code) === 200) {
        // 计算座位号
        let result = data.result.obj
        this.passengers = result
        let arr = []
        let arr1 = []
        switch (this.userData.typeCode) {
          case '飞机':
            result.map(value => {
              this.seats.push(value.tripRecordEntity[0].seatNumber)
              arr.push(parseInt(value.tripRecordEntity[0].seatNumber))
            })

            arr.sort((value1, value2) => value1 - value2)
            arr1.push(arr[0])
            arr1.push(arr[arr.length - 1])

            this.seatLine = arr1
            break
          case '火车':
            result.map(value => {
              this.seats.push(value.tripRecordEntity[0].seatNumber)
              arr.push(parseInt(value.tripRecordEntity[0].seatNumber))
            })

            arr.sort((value1, value2) => value1 - value2)
            arr1.push(arr[0])
            arr1.push(arr[arr.length - 1])

            this.seatLine = arr1
            break
          case '汽车':
            result.map(value => {
              this.seats.push(value.tripRecordEntity[0].seatNumber)
            })
            break
          case '旅馆':
            result.map(value => {
              this.hotelRooms.push(value.roomNo)
              arr.push(Math.floor(value.roomNo / 100))
              arr1.push(value.roomNo)
            })
            // 保存楼层号
            arr = [...new Set(arr)]
            arr.sort((value1, value2) => value1 - value2)
            this.floors = arr

            // 用规定的格式保存用户数据
            arr1 = [...new Set(arr1)]
            arr1.sort((value1, value2) => value1 - value2)
            let userData = {}
            arr1.forEach(value => {
              userData[value] = []
            })
            for (const key in userData) {
              if (userData.hasOwnProperty(key)) {
                for (let index = 0; index < result.length; index++) {
                  if (result[index].roomNo - 0 === key - 0) {
                    userData[key].push(result[index])
                  }
                }
              }
            }
            this.hotelMember = userData
            break
          case '网吧':
            result.map(value => {
              this.seats.push(value.computerNo)
            })
            break
        }
      }
    })
  },
  // beforeDestroy() {
  //   Cookies.remove('shikong_data')
  // },
}
</script>

<style lang="stylus" scoped>
.timespaceinfo
  position absolute
  top 50px
  right 0
  bottom 0
  left 0
  margin auto

.seatInfoCoat1, .seatInfoCoat2 {
  padding: 10px;
  background-color: rgba(44, 239, 255, 0.1);
}

.seatInfoCoat1 {
  width: 840px;
  margin: 0 auto
}

.seatInfoCoat2 {
  width: 820px;
  border: 1px solid rgba(44, 239, 255, 0.2);
}

.seatInfoCoat3 {
  width: 800px;
  height: auto;
  overflow: hidden;
}

.seatInfo {
  width: 820px;
  min-height: 100px;
  background-color: rgba(44, 239, 255, 0.2);
  overflow-y: scroll;
}

.noOne {
  display: inline !important;
  color: #333333 !important;
}

.exist {
  display: inline !important;
  color: #ffffff !important;
}

.parties {
  display: inline !important;
  color: #e22929 !important;
  font-weight: 900;
}

.journeyInfo {
  width: 100%;
}

.infoItem {
  float: left;
  display: inline-block;
  height: 90px;
  padding: 10px 0;
  border-bottom: 1px solid #143d4b;
}

.infoItem span {
  display: inline-block;
  width: 100%;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  line-height: 30px;
}

.infoItem:nth-child(2) span {
  text-align: initial;
  line-height: 38px;
}

.infoItem:nth-child(3), .infoItem:nth-child(4) {
  span {
    line-height: 113px;
  }
}

.seatDesc {
  width: 100%;
  height: 40px;
}

.infoItem2 {
  float: left;
  display: inline-block;
  height: 40px;
  padding: 10px 0;
  border-bottom: 1px solid #143d4b;
}

.infoItem2:nth-child(1) {
  padding: 10px 20px;
}

.infoItem2 span {
  display: inline-block;
  width: 100%;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  line-height: 20px;
}

.infoItem2:nth-child(1) span {
  text-align: initial;
}

.seatInfoCoat3 .seatInfo .seatLayout {
  .columnName {
    width: 100%;
    height: 40px;
  }

  .list {
    float: left;
    display: inline-block;
    width: 14%;
    height: 50px;
    padding: 10px 0;
    text-align: center;
    border-bottom: 1px solid #143d4b;
  }

  .list span {
    color: #ffffff;
    font-size: 18px;
  }

  .hc_seatLayout .list {
    width: 14%;
  }

  .hc_seatLayout .aisle {
    width: 16%;
  }

  .fj_seatLayout .list {
    width: 9%;
  }

  .qc_seatLayout .list {
    width: 16%;
  }

  .lg_seatLayout .list, .wb_seatLayout .list {
    width: 7%;
  }

  .wb_seatLayout .list:nth-child(27n+1) span {
    font-size: 14px;
  }

  .qc_seatLayout .aisle {
    width: 20%;
  }
}

.passengerInfo {
  position: absolute;
  right: 0;
  top: 0;
}

.cardList {
  display: inline-block;
  margin: 0 10px 10px 0;
  padding: 5px 10px;
  background-color: rgba(44, 239, 255, 0.2);
  color: #ffffff;
}

.okCard {
  background-color: rgba(44, 239, 255, 0.4);
}
</style>
<style lang="stylus">
.atooltip[x-placement^=top] .popper__arrow {
  border-top-color: #59bec6 !important;
}

.atooltip[x-placement^=top] .popper__arrow:after {
  border-top-color: #59bec6 !important;
}

.atooltip {
  background: #59bec6 !important;
}
</style>
