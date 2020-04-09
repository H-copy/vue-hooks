import Vue from 'vue'


export default function isVm (obj){
    return obj instanceof Vue
}


export function getVmElement(vm){
    return isVm(vm) ? vm.$el : vm
}