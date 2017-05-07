using UnityEngine;

public class PerformAttack : MonoBehaviour {

	public float coolDown = 0.2f;
	[SerializeField]
	private float coolDownRemaining = 0f;
	public float range = 100f;
	public GameObject firePrefab;

	void Start () {
		
	}
	
	void Update () {
		coolDownRemaining -= Time.deltaTime;
		if(Input.GetMouseButton(0) && coolDownRemaining <= 0) {
			Ray ray = new Ray(Camera.main.transform.position, Camera.main.transform.forward);

			RaycastHit hitInfo;

			if(Physics.Raycast(ray, out hitInfo, range)) {
				switch(hitInfo.collider.tag) {
					case "Enemy":
						Destroy(hitInfo.collider.gameObject);
						Instantiate(firePrefab, hitInfo.point, hitInfo.transform.rotation);
						break;
				}
			}
		}		
	}
}
