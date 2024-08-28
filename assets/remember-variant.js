	function updateRememberedVariant(variantId) {
		localStorage.setItem('rememberedVariant', variantId);
		
		const rememberedVariantId = localStorage.getItem('rememberedVariant');
		console.log(`[TRACK] ${rememberedVariantId}`);
	}