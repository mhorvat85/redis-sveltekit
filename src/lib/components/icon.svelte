<script lang="ts">
	import c from 'classnames';

	export let name = '';
	export let size = '16px';
	export let klass = '';

	const klasses = c('material-icons-outlined', klass);
</script>

<span role="button" tabindex="0" on:click class={klasses} style:font-size={size}>{name}</span>
