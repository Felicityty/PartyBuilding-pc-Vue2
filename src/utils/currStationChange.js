// 编辑对话框的支部、班级select的关系 - 1
export function currStationChange() {
  this.form.classGradeName = this.classOptionsChooseOptions[this.form.partyBranchName][0].label
}

// 编辑对话框的支部、班级select的关系 - 2
export function currStationChangeEdit() {
  this.editList.classGradeName = this.classOptionsChooseOptions[this.editList.partyBranchName][0].label
}

// 新增对话框的支部、班级select的关系 - 1
export function currStationChangeAdd() {
  this.addForm.classGradeName = this.classOptionsChooseOptions[this.addForm.partyBranchName][0].label
}

// 新增对话框的支部、班级select的关系 - 2
export function currStationChangeUserAdd() {
  this.queryInfo.classGradeName = this.classOptionsChooseOptions[this.queryInfo.partyBranchName][0].label
}

export function currStationUserEdit() {
  this.form.classGrade = this.classOptionsChooseOptions[this.form.branch][0].label
}

// // 主页的支部、班级select的关系
// export function currStationChangeIndex() {
//   this.queryInfo.classGradeName = this.classOptionsChooseOptions[this.queryInfo.partyBranchName][0].label
// }
