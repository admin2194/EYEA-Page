import { defineStore } from 'pinia'
export const useMembership = defineStore('membership', () => {
    const items = ref({ range: [10000, 1000000] });
    const current = ref(1);
    const currentStep = computed(() => current.value)
    function nextStep() {
        console.log('show next step')
        current.value++;
    }
    function prevStep() {
        current.value--;
    }
    function stepTo(val) {
        current.value = val;
    }
    function setTinFile(val) {
        items.value.TIN_file_url = val;
    }
    function setLogoFile(val) {
        items.value.company_logo_url = val;
    }
    function clear() {
        items.value = {};
        current.value = 1;
    }
    function $reset() {
        items.value = ({});
        current.value = 1;
    }
    return { items, current, currentStep, setTinFile, setLogoFile, nextStep, prevStep, stepTo, clear, $reset };
}, { persist: true })

export const useIndividualMembership = defineStore('membership', () => {
    const items = ref({});
    const current = ref(1);
    const currentStep = computed(() => current.value)
    function nextStep() {
        console.log('show next step')
        current.value++;
    }
    function prevStep() {
        current.value--;
    }
    function stepTo(val) {
        current.value = val;
    }
    function setIdFile(val) {
        items.value.id_url = val;
    }
    function setPhotoFile(val) {
        items.value.photo_url = val;
    }
    function clear() {
        items.value = {};
        current.value = 1;
    }
    function $reset() {
        items.value = ({});
        current.value = 1;
    }
    return { items, current, currentStep, setIdFile, setPhotoFile, nextStep, prevStep, stepTo, clear, $reset };
}, { persist: true })



export const  commonMembership = defineStore('common', () => {
    const items = ref({});
    function $reset() {
        items.value = ({});
        
    }
    return { items, $reset };
}, { persist: true })